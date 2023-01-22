import { Component, Inject } from '@angular/core';
import { FormGroup , FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
freshnessList = ["Brand New", "Second Hand", "Refurbish"]
actionButton : string = "Save";
productForm !: FormGroup;

constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : DialogRef<DialogComponent>, 
  @Inject(MAT_DIALOG_DATA) public editData : any){}
ngOnInit() : void{
  this.productForm = this.formBuilder.group({
    productName : ['',Validators.required],
    category : ['',Validators.required],
    freshness : ['', Validators.required],
    price : ['', Validators.required],
    comment : ['', Validators.required],
    date : ['', Validators.required],
  });

  if (this.editData) {
    this.actionButton = "Update"
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['date'].setValue(this.editData.date);
    this.productForm.controls['freshness'].setValue(this.editData.freshness);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
  }
  
}
addProduct(){
 if(this.editData){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert("Product added Successfully!")
        this.productForm.reset();
        this.dialogRef.close();
      },
      error:()=>{
        alert("Error While adding the product")
      }
    })
  }
 }else{
  this.updateProduct()
 }
}
updateProduct(){
  this.api.updateProduct(this.productForm.value, this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Product updated successfully");
      this.productForm.reset();
      this.dialogRef.close();
    },
    error:()=>{
alert("Error while updating the record!")
    }
  })
}
}