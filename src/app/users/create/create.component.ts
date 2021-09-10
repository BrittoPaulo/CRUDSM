import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  ResponseObjectCreate } from '../user.model';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserService } from '../user.service';
import {  map } from 'rxjs/operators'
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  response!: ResponseObjectCreate;
  checkoutForm = this.formBuilder.group({
    name: '',
    job: ''
  })
  constructor( private formBuilder: FormBuilder,private userService: UserService, public dialog: MatDialog, private router: Router) { }
  onSubmit(): void {
    if(this.checkoutForm.value.job && this.checkoutForm.value.name){
      const  getRequest =  this.userService.createUser(this.checkoutForm.value).pipe(
        map((elem: any) => {
            return {...elem, createdAt: moment(elem.createdAt).format('MM/DD/YYYY HH:mm')}
          })
      );
  
      getRequest.subscribe((res) => {
        if(res){
          this.response = res;        
          this.dialog.open(DialogCreateUser,{data: this.response});
          this.checkoutForm.reset();
        }
      })
    }
  }
  goBack():void{
    this.router.navigateByUrl('/users');
  }
  ngOnInit(): void {
  }

}
/*Modal com os dados do usuário*/
@Component({
  styleUrls: ['./create.component.css'],
  selector: 'dialog-new-user',
  templateUrl: 'dialog-new-user.html',
})
export class DialogCreateUser {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateUser>,
    @Inject(MAT_DIALOG_DATA) public data: ResponseObjectCreate) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}