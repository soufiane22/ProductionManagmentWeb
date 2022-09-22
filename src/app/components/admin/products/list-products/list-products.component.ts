import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Line } from 'src/app/shared/modules/Line';
import { Produit } from 'src/app/shared/modules/Produit';
import { LineService } from 'src/app/shared/services/line.service';
import { ProductService } from 'src/app/shared/services/product.service';
import * as FileSaver from 'file-saver';
import {cloneDeep} from 'lodash';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListProductsComponent implements OnInit {

  lines: Line[];
  selectedLine: Line
  productForm: FormGroup
  lineForm: FormGroup
  modeUpdate: Boolean = false
  display: boolean = false;

  constructor(private lineService: LineService, private fb: FormBuilder, public messageService: MessageService,
    private produitService: ProductService, private productService: ProductService, private confirmationService: ConfirmationService) {
    this.getAllLines()
    this.getAllProducts()
    this.createProductForm()
    this.createLineForm()
  }

  ngOnInit(): void {

  }

  getAllLines() {
    this.lineService.getAll().subscribe(
      response => {
        this.lines = response.data1;
        console.log("lines ", response);

      },
      error => {
        console.log("error ", error);
      }
    )
  }

  products: Produit[] = []
  getAllProducts() {
    this.productService.getAll().subscribe(
      response => {
        this.products = response.data1;
        console.log("products ", this.products);

      },
      error => {
        console.log("error ", error);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" })
      }
    )
  }

  createProductForm() {
    this.productForm = this.fb.group(
      {
        designation: this.fb.control({ value: "", disabled: false }, [Validators.required]),
        reference: this.fb.control({ value: "", disabled: false }, [Validators.required]),
        listLines: this.fb.control({ value: this.selectedLine, disabled: false }, [Validators.required]),
        tc: this.fb.control({ value: "", disabled: false }, [Validators.required]),
      }

    )
  }

  createLineForm() {
    this.lineForm = this.fb.group({
      designation: this.fb.control({ value: "", disabled: false }, [Validators.required]),
    })
  }

  get designationLine() {
    return this.lineForm.get('designation')
  }



  get designation() {
    return this.productForm.get('designation');
  }
  get reference() {
    return this.productForm.get('reference');
  }
  get listLines() {
    return this.productForm.get('listLines');
  }
  get tc() {
    return this.productForm.get('tc');
  }

  save_product() {
    if (!this.modeUpdate) {
      if (this.productForm.valid) {
        this.produitService.add(this.productForm.value).subscribe(
          response => {
            this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: "Product saved with success" });
            console.log("response ", response);
            this.productForm.reset();
            this.getAllProducts();
          },
          error => {
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" });
            console.log("error", error);

          }
        )
      } else {
        this.messageService.add({ key: 'tl', severity: 'warn', summary: 'Warn', detail: "Fill in the empty fields please" });
      }
    }
    else {
      this.produitService.update(this.productForm.value, this.productSelected.id).subscribe(
        response => {
          this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: "Product updated with success" });
          console.log("response ", response);
          this.productForm.reset();
          this.getAllProducts();
          this.modeUpdate = false;
          this.productForm.reset();
        },
        error => {
          this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Server error" });
          console.log("error", error);

        }
      )

    }

  }

  productSelected: Produit
  onEditProduct(product) {
    this.modeUpdate = true
    this.productForm.controls['designation'].setValue(product.designation);
    this.productForm.controls['reference'].setValue(product.reference);
    this.productForm.controls['listLines'].setValue(product.listLines);
    this.productForm.controls['tc'].setValue(product.tc);
    this.productSelected = product
  }

  deleteProduct(product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.productService.delete(product.id).subscribe(
          success => {
            console.log("success ", success);
            this.messageService.add({ key: 'tl', severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          },
          error => {
            console.log("error ", error);
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Server error', life: 3000 });
          }
        )

      }
    });

  }

  productFile :any[]
  listLine : String[]
  exportExcel(){
    let listLines = ""
    this.listLine = [];
    this.productFile = [];
    import("xlsx").then(xlsx => {
      this.productFile
      this.productFile = cloneDeep(this.products);  
      this.productFile.forEach(p => {
         p.listLines.forEach(line =>{
          listLines += line.designation+" ;"
         }
         )
         p.listLines = listLines;
         listLines =""
      });
      const worksheet = xlsx.utils.json_to_sheet(this.productFile);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "References");
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

  onAddLine() {
    this.modeEditLine= false
    this.display = true
  }

  modeEditLine: Boolean = false
  line:Line
  onEditLine(line) {
    this.modeEditLine = true
    this.display = true
    this.lineForm.controls['designation'].setValue(line.designation);
    this.line = line
  }
  deleteLine(line) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this line?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lines = this.lines.filter(val => val.id !== line.id);
        this.lineService.delete(line.id).subscribe(
          success => {
            console.log("success ", success);
            this.messageService.add({ key: 'tl', severity: 'success', summary: 'Successful', detail: 'Line Deleted', life: 3000 });
            this.getAllLines();
            this.getAllProducts();
          },
          error => {
            console.log("error ", error);
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Server error', life: 3000 });
          }
        )

      }
    });

  }

  save_line() {
    if (!this.modeEditLine) {
      this.lineService.save(this.lineForm.value).subscribe(
        response => {
          this.messageService.add({ key: 'tl', severity: 'success', summary: 'Successful', detail: 'Line saved', life: 3000 });
          this.getAllLines()
         
          this.display = false
          this.lineForm.reset()
        },
        error => {
          this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Server error', life: 3000 });
          console.log("error", error);
        }
      )
    } else {

      this.line.designation = this.lineForm.value.designation
      this.lineService.update(this.line).subscribe(
        response => {
          this.messageService.add({ key: 'tl', severity: 'success', summary: 'Successful', detail: 'Line updated', life: 3000 });
          this.getAllLines()
          this.getAllProducts()
          this.display = false
          this.lineForm.reset()
          this.modeUpdate = false
        },
        error =>{
          this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Server error', life: 3000 });
          console.log("error", error);
        }
      )

    }

  }

  cancel() {
    this.productForm.reset()
    this; this.lineForm.reset()
  }


}
