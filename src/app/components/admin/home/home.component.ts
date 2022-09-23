import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Line } from 'src/app/shared/modules/Line';
import { MonthYear } from 'src/app/shared/modules/MonthYear';
import { NotificationHours } from 'src/app/shared/modules/Notification-Hours';
import { Produit } from 'src/app/shared/modules/Produit';
import { Statistic } from 'src/app/shared/modules/Statistic';
import { StatisticMonth } from 'src/app/shared/modules/StatisticMonth';
import { LineService } from 'src/app/shared/services/line.service';
import { NotificationHoursService } from 'src/app/shared/services/notification-hours.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { StatisticService } from 'src/app/shared/services/statistic.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationHoursModule } from '../notification-hours/notification-hours.module';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  basicData
  rangeDates: string[] = []
  horizontlAxe: string[] = []
  show = true
  options = [
    { id: "line", name: "Line" },
    { id: "reference", name: "Reference" }];
  selectedOption
  constructor(public messageService: MessageService, private lineService: LineService, private productService: ProductService,
    private notificationService: NotificationHoursService, private userService: UserService, private statisticMonthService: StatisticService) {
    this.getAllLines()
    //this.getAllProducts()
    this.getStatistics()
    

  }

  
  ngOnInit(): void {
    this.show = false
    this.selectedOption = this.options[0].id;
    setTimeout(function() {this.addNumbers(1,6)},10000)

  }

   addNumbers(x, y) {
    console.log("test setTimeout");
    if (isNaN(x) || isNaN(y)) {
      throw('One or both parameters are not numbures')
    }
    else
    console.log("the both parameters are numbers");
    
    }

   labels
  initDataChart(){
    this.labels = cloneDeep(this.columnClone);
    this.basicData = {
      labels: this.labels.reverse(),
      datasets: [
          {
              label: 'Productivity %',
              data: this.listProductivity.reverse(),
              fill: false,
              borderColor: '#04e00f',
              tension: .4
          },
          {
              label: 'Scrap %',
              data: this.listScrap.reverse(),
              fill: false,
              borderColor: '#FFA726',
              tension: .4
          }
      ]
  };
  }

  rows
  listSt:Statistic[]
  /*********** get statistics month  ***************/
  listStatisticsMonth
  listStatisticsMonthGlobale
  columnClone
  listProductivity
  listScrap
  getStatisticsMonth(date1, date2) {
    this.listSt = []
    this.listProductivity= []
    this.listScrap = []
    this.statisticMonthService.getBetweenDates(date1, date2,"line").subscribe(
      response => {
      
        this.listStatisticsMonth = response;
       // console.log("statistics month ", this.listStatisticsMonth);
         this.listStatisticsMonth[0].listStatistics.forEach(element => {
          this.columns.push(element.month)
          this.listProductivity.push(element.productivity)
          this.listScrap.push(element.tauxScrap)
         });

         this.listStatisticsMonthGlobale = cloneDeep(this.listStatisticsMonth); 
         this.columnClone = cloneDeep(this.columns);
         this.initDataChart()

      },
      error => {
        console.log("erooooooooor ", error);

      }
    )
  }



  statistics: { "totalEmployees": number, "totalLines": number, "totalProduct": number }
  totalEmployees: number = 0
  getStatistics() {
    this.show = false
    this.userService.getStatistics().subscribe(
      response => {
        this.statistics = response.data
        this.totalEmployees = this.statistics.totalEmployees
        this.show = true
      },
      error => {
        this.show = true
        console.log("erroe ", error);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" })
      }

    )
  }

   list ;
  /******* filter statisic by line *********/
  getByLine(line) {
    console.log("line selected ", this.selectedLine.designation);

    this.listStatisticsMonth  = this.listStatisticsMonthGlobale
    let found: boolean = false
  //   this.listStatisticsMonth = this.listStatisticsMonth.filter(st => {st.line ==  this.selectedLine.designation;
  //    console.log("st.line ",st.line );
  //  } )
   this.list = this.listStatisticsMonthGlobale.forEach(st => {
    if(st.line === this.selectedLine.designation){
      found = true;
      this.list = []
      this.listStatisticsMonth = []
      this.listStatisticsMonth.push(st)
      this.list.push(st)
   
    }    
    if(this.selectedLine.designation === "All"){
       this.listStatisticsMonth = this.listStatisticsMonthGlobale
  
    }

   })

   this.columns = this.columnClone
  this.selectedDate = this.dates[0]
  this.listStatisticsMonth[0].listStatistics.forEach(element => {
    this.listProductivity.push(element.productivity)
    this.listScrap.push(element.tauxScrap)
  }); 
   this.initDataChart()
   this.getProductByLine();
  }

  /******* filter statisic by refernce *********/
  getByReference() {
    console.log("reference selected ", this.selectedProduct);
    const date = new Date();
    if(this.selectedProduct.reference =="All"){
      this.listStatisticsMonth = this.listStatisticsMonthGlobale
      this.selectedLine = this.all
    }else{
      this.statisticMonthService.getByReferences(date.getFullYear(),this.selectedProduct.id,"reference").subscribe(
        response => {
          console.log("response ",response);
          this.listStatisticsMonth = []
          this.listStatisticsMonth.push(response)
  
        },
        error => {
         console.log("erro ",error);
        }
      )
    }

    this.columns = this.columnClone
    this.selectedDate = this.dates[0]
  }

  /******* filter statisic by date *********/
  
  getByDate() {
    if(this.selectedDate.monthYear == "All"){
      this.listStatisticsMonth = this.listStatisticsMonthGlobale
      this.columns = this.columnClone;
    }else{
      if(this.selectedLine.designation == "All"){
        this.statisticMonthService.getByMonthAndType(this.selectedDate.monthYear,"line").subscribe(
          response => {
            
           console.log("response ", response);
            this.listStatisticsMonth = response
            this.dates.forEach(column => {
              if (column.monthYear == this.selectedDate.monthYear){
                   this.columns = []
                    this.columns.push(column.monthYear)
              }
         
           });

          // console.log("columns ",this.columns);
          },
          error => {
            console.log("error");
            
          }
        )
    }else{
    
      
      if( this.selectedProduct.reference =="All"){
        this.statisticMonthService.getByLineAndMonth(this.selectedLine.id,this.selectedDate.monthYear).subscribe(
          response => {

           this.listStatisticsMonth = response
           this.dates.forEach(column => {
            if (column.monthYear == this.selectedDate.monthYear){
                 this.columns = []
                  this.columns.push(column.monthYear)
            }
       
         });
          },
          error => {
           console.log("error ",error);
        
          }
        )
      }else{
        console.log("this.selectedProduct ",this.selectedProduct);
        this.statisticMonthService.getByRefAndMonth(this.selectedProduct.id , this.selectedDate.monthYear).subscribe(
          response => {
            console.log("respnse ",response);
            this.listStatisticsMonth = response
            this.dates.forEach(column => {
             if (column.monthYear == this.selectedDate.monthYear){
                  this.columns = []
                   this.columns.push(column.monthYear)
             }
        
          });
          },
          error => {
            console.log("error ",error);
            
          }
        )
      }
    }
    }
  

  }

  /*************** get list of months for curent years *************/
  dates: MonthYear[] = [];
  columns:string [] = [];
  selectedDate: MonthYear = new MonthYear;
  firstDate: string
  lastDate: string
  getMonth() {
    const date = new Date();
    var d = new Date();
    var dateString = ""
    let monthNum = date.getMonth()
    let i = 0;
    console.log("monthNum ",monthNum);
    let j = monthNum
    while(i < 6 && j >=0){
      var d = new Date(date.getFullYear(), j, 1);
     // this.columns.push(d.toLocaleString('en-us', { month: 'short' }) + "   " + d.getFullYear()) 
      i++
      j--
    }

    for (let i = 0; i < 12; i++) {
      var d = new Date(date.getFullYear(), i, 1);
      let month1 = d.getMonth() + 1;
      dateString = d.getFullYear() + "-" + month1 + "-" + "01";
      if (i == 0)
        this.firstDate = dateString
      if (i == 11)
        this.lastDate = dateString
      let shortMonth = d.toLocaleString('en-us', { month: 'short' }) + " " + d.getFullYear();
      let month: MonthYear = new MonthYear();
      month.id = i + 1;
      month.date = dateString;
      month.monthYear = shortMonth;
      this.dates.push(month);

    }

    this.selectedDate.id = 0;
    this.selectedDate.date = null;
    this.selectedDate.monthYear = "All"
    this.dates.unshift(this.selectedDate)
    this.selectedDate = this.dates[0]
    this.getStatisticsMonth(this.firstDate, this.lastDate);
  }

  getDatesInRange(startDate, endDate) {

    const date = new Date(startDate.getTime());
    console.log("date strat ", date);

    const dates = [];

    while (date <= endDate) {
      const date1 = new Date(date)
      const dateString = date1.toISOString().split('T')[0];
      this.rangeDates.push(dateString);
      date.setDate(date.getDate() + 1);
    }
    this.horizontlAxe = this.rangeDates;
    //console.log("dates ===> " ,this.horizontlAxe);
    return dates;
  }


  startDate = ""
  onStarDateSelection(date) {
    this.startDate = date.year + "-" + date.month + "-" + date.day
  }

  endDate = ""
  onEndDateSelection(date) {
    this.endDate = date.year + "-" + date.month + "-" + date.day;

  }

  search() {

    if (this.endDate == "" || this.startDate == "") {
      this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Select dates please !' });
    }
    else {
      let d1 = new Date(this.startDate);
      let d2 = new Date(this.endDate);
      d2.setDate(d2.getDate() + 1)
      d1.setDate(d1.getDate() + 1)
      this.getDatesInRange(d1, d2)
      if (this.selectedOption == "line")
        this.getNotificationByLine()
      else {
        this.getNotificationByProduct()
      }
    }

  }

  all: Line = {
    id: "0",
    designation: "All"
  }
  lines: Line[] = []
  selectedLine: Line = this.lines[0]
  getAllLines() {
    this.lineService.getAll().subscribe(
      response => {
        this.lines = response.data1;
        this.lines.unshift(this.all);
        this.selectedLine = this.lines[0];
        this.products.unshift(this.allProduct);
        this.selectedProduct = this.products[0];
        this.getMonth();

      },
      error => {
        console.log("error ", error);
      }
    )
  }


  products: Produit[] = []
  selectedProduct: Produit

  allProduct: Produit = {
    id: "0",
    reference: "All"
  }
  getProductByLine() {
    this.products = []
    if (this.selectedLine.id == "0") {
      this.products.unshift(this.allProduct);
      this.selectedProduct = this.products[0];
    } else {
      this.productService.getByLine(this.selectedLine.id).subscribe(
        response => {
          this.products = response.data1;
          this.products.unshift(this.allProduct);
          this.selectedProduct = this.products[0];
        },
        error => {
          console.log("error ", error);

        }
      )
    }

  }

  getAllProducts() {
    this.productService.getAll().subscribe(
      response => {
        this.products = response.data1;
        this.selectedProduct = this.products[0]


      },
      error => {
        console.log("error ", error);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" })
      }
    )
  }



  listNotifications: NotificationHours[]
  getNotificationByLine() {
    this.show = false
    console.log("start date ", this.startDate);

    this.notificationService.getNotifsHoursBeteenTowDatesByLine(this.startDate, this.endDate, this.selectedLine.id).subscribe(
      response => {
        this.show = true
        this.listNotifications = response
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: "Statistics retrieved" });

      },
      error => {
        this.show = true
        console.log("error ", error);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" });
      }
    )
  }

  getNotificationByProduct() {
    this.show = false
    this.notificationService.getNotifsHoursBeteenTowDatesByProduct(this.startDate, this.endDate, this.selectedProduct.id).subscribe(
      response => {
        this.show = true
        this.listNotifications = response
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: "Statistics retrieved" });
        console.log("listNotifications =========> ", this.listNotifications);


      },
      error => {
        this.show = true
        console.log("error ", error);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" });
      }
    )
  }




  basicOptions
  applyDarkTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      },

      scales: {
        x: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        y: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      }
    };
  }
}


function addNumbers(arg0: number, arg1: number) {
  throw new Error('Function not implemented.');
}

