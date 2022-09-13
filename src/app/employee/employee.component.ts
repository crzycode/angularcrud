import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms'
import { Employeemodel } from '../Model/Employee.model';
import {apiservice } from '../Shared/api.service'
import{HttpClient}from '@angular/common/http'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  data:any 
formdata!: FormGroup;
Empmodelobj: Employeemodel = new Employeemodel();
show!:boolean;
hide!:boolean;

  
  constructor(private formbuilder: FormBuilder,private api:apiservice) { }

  ngOnInit(): void {
    this.formdata = this.formbuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      number:[''],
      salary:[''],
    })
    this.Getallemployee();
  }
  clicktohide(){
    this.formdata.reset();
    this.show = true;
    this.hide = false;

  }
  PostEmployee(){
    this.Empmodelobj.firstname = this.formdata.value.firstname;
    this.Empmodelobj.lastname = this.formdata.value.lastname;
    this.Empmodelobj.email = this.formdata.value.email;
    this.Empmodelobj.number = this.formdata.value.number;
    this.Empmodelobj.salary = this.formdata.value.salary;
    this.api.EmpPost(this.Empmodelobj).subscribe(data=>{
      console.log(data)
      this.formdata.reset();
      this.Getallemployee();
    },err=>{
      console.log("something went wrong ")
    })
    
  }
  Getallemployee(){
    this.api.EmpGet().subscribe(res=>{
this.data = res;
    })
  }
  empdelete(item:number){
    this.api.EmpDelete(item).subscribe(res=>{
      console.log('emp is deleted' + item)
      this.Getallemployee();
    })

  }
  onedit(item:any){
    this.show = false;
    this.hide = true;
    this.Empmodelobj.id = item.id;
    this.formdata.controls['firstname'].setValue(item.firstname);
    this.formdata.controls['lastname'].setValue(item.lastname);
    this.formdata.controls['email'].setValue(item.email);
    this.formdata.controls['number'].setValue(item.number);
    this.formdata.controls['salary'].setValue(item.salary);

  }
  updateEmployee(){
    this.Empmodelobj.firstname = this.formdata.value.firstname;
    this.Empmodelobj.lastname = this.formdata.value.lastname;
    this.Empmodelobj.email = this.formdata.value.email;
    this.Empmodelobj.number = this.formdata.value.number;
    this.Empmodelobj.salary = this.formdata.value.salary;
    this.api.EmpPut(this.Empmodelobj,this.Empmodelobj.id).subscribe
    (res=>{
      console.log('update success fully ')
      this.formdata.reset();
      this.Getallemployee();
    })

  }
}
