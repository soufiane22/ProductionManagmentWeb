import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { NotificationHours } from 'src/app/shared/modules/Notification-Hours';
import { NotificationHoursService } from 'src/app/shared/services/notification-hours.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SelectItem } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { cloneDeep } from 'lodash';

/*********** Modal Services *********** */
import { NgbModal, ModalDismissReasons, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Line } from 'src/app/shared/modules/Line';
import { LineService } from 'src/app/shared/services/line.service';
@Component({
  selector: 'app-list-notification-hours',
  templateUrl: './list-notification-hours.component.html',
  styleUrls: ['./list-notification-hours.component.css'],
  providers: [MessageService]
})
export class ListNotificationHoursComponent implements OnInit {

  notifs: NotificationHours[];
  closeResult = '';
  date;
  fromDate: NgbDate | null;
  dateString
  startDate = "";
  endDate
  show = false
  editing = false
  statuses: SelectItem[];
  clonedNotifs: { [s: string]: NotificationHours; } = {};
  options = [{ "id": "Line", "name": "Line" },{ "id": "OF", "name": "OF" }];
  selectedOption;
  lines: Line[] = []
  private today = new Date();

  constructor(private notificationHoursService: NotificationHoursService, private userAuthService: UserAuthService,
    private modalService: NgbModal, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    public messageService: MessageService, private router: Router, private lineService: LineService
  ) {
    this.fromDate = this.calendar.getToday();
    this.selectedOption = this.options[0].name;
    this.getAllLines();
  }

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert;

  ngOnInit(): void {

    this.statuses = [{ label: 'Validate', value: 'Validate' }, { label: 'No Validate', value: 'No Validate' }]
    this.dateString = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
    console.log("date selected ", this.dateString);
    this.getnotifByDate(this.dateString);
  }

  getAllLines() {
    this.show = true
    this.lineService.getAll().subscribe(
      response => {
        this.lines = response.data1;
        this.show = false
      },
      error => {
        console.log("error ", error);
        this.show = false
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" });
      }
    )
  }

  selectedLine=[]
  listNotifsClone
  filterByline(){
    console.log("listNotifsClone ",this.listNotifsClone);
    if(this.notifs != null)
    this.notifs = this.listNotifsClone.filter(p => p.ligne.id == this.selectedLine[0].id)

    console.log("notifs ",this.selectedLine);
    this.calculateTotalHours(this.notifs)
  }

  showMessage(message) {

    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: message });
  }

  isToday = (date: NgbDate) => {
    return date.day == this.today.getDate() &&
      date.month == this.today.getMonth() + 1 &&
      date.year == this.today.getFullYear();
  }



  getnotifByDate(date) {
    this.show = false
    this.notificationHoursService.getNotifsHoursByDate(date).subscribe(
      response => {
        this.notifs = response;
        console.log("response ", this.notifs);
        this.selectedLine = []
        if (this.notifs.length == 0) {
          this.show = true
          this.showMessage('No notification found in this date')
        }
        this.listNotifsClone =cloneDeep(this.notifs)
        this.show = true
        this.calculateTotalHours(this.notifs)
      },
      error => {
        this.show = true
        console.log("error ====>", error);
        this.showMessage('Server error')
        // if(error.status == 403){

        //   this.router.navigate(['/login'])
        // }
      }
    )
  }

  of
  getNotifByOf() {
    this.show = false
    //  console.log("of=====>",this.of);
    this.notificationHoursService.getNotifsHoursByOf(this.of).subscribe(
      response => {
        this.show = true;
        this.of = null
        this.notifs = response
        if (this.notifs.length == 0) {
          this.show = true
          this.showMessage('No notification found for this OF')
        }
        this.calculateTotalHours(this.notifs)

      },
      error => {
        this.of = ""
        this.show = true
        console.log("error ===>", error);
        this.showMessage('Server error')

      }
    )

  }

  filteredValues
  onFilter(event, dt) {
    this.filteredValues = event.filteredValue;
    this.calculateTotalHours(this.filteredValues)
  }


  onStarDateSelection(date) {
    this.startDate = date.year + "-" + date.month + "-" + date.day

    this.getnotifByDate(this.startDate)


    // console.log("dateString",this.dateString);
  }
  onEndDateSelection(date) {
    this.endDate = date.year + "-" + date.month + "-" + date.day;
    if (this.startDate != "")
      this.getNotifBetweenTwoDates(this.startDate, this.endDate)
    else
      this.showMessage('Select start date please')
  }

  getNotifBetweenTwoDates(startDate, endDate) {
    this.show = false
    this.selectedLine = []
    this.notificationHoursService.getNotifsHoursBeteenTowDates(startDate, endDate).subscribe(
      response => {
        this.notifs = response
        if (this.notifs.length == 0) {
          this.show = true
          this.showMessage('No notifications found between this dates')
        }
        this.listNotifsClone =cloneDeep(this.notifs)
        this.show = true
        this.calculateTotalHours(this.notifs)

      },
      error => {
        this.show = true
        console.log("error ===>", error);
        this.showMessage('Server error')
      }
    )
  }

  clear(table: Table) {
    table.clear();
  }

  totalHours: number = 0
  calculateTotalHours(rows) {
    this.totalHours = 0
    rows.forEach(notif => {
      this.totalHours += notif.total_h;
    });

    return this.totalHours;
  }

  /************ Modal functions *********** */
  open(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /******************************** */
  notif: NotificationHours
  onDetailModal(notifSelected, modal) {
    this.notif = notifSelected

    this.notif.productivity = (Math.round(this.notif.productivity * 100) / 100)
    // console.log("notidSelected: ",this.notif );
    this.open(modal);
  }

  /********** Edit Row functions ************* */

  onDelete: Boolean = true
  modeVue: Boolean = true
  onRowEditInit(notif) {
    this.clonedNotifs[notif.id] = { ...notif };
    this.onDelete = false;
    this.modeVue = false;
  }
  onRowEditSave(notif) {

    delete this.clonedNotifs[notif.id];
    this.notificationHoursService.updateNotification(notif, notif.id).subscribe(
      response => {
        console.log("response ", response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notification is updated' });
        this.onDelete = true;
        this.modeVue = true;
      },
      error => {
        console.log("error ", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
        this.modeVue = true;
      }
    )



  }

  onRowEditCancel(notif, ri) {
    this.onDelete = true;
    this.modeVue = true;
    // this.products2[index] = this.clonedProducts[product.id];
    //       delete this.clonedProducts[product.id];

  }
  /********** End ************************ */

  /********************* Exporting Excel functions ********************** */
  notifFile: any[];
  exportExcel() {
    this.notifFile = []
    this.notifFile = cloneDeep(this.notifs);
    this.notifFile.forEach(n => {
      n.produit = n.produit.designation;
      n.ligne = n.ligne.designation;
    })
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.notifFile);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Notification_Hours");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().toISOString() + EXCEL_EXTENSION);
  }
  /****************************************************************** */




}


