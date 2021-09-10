import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators'
import * as moment from 'moment';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  id: string;
  name: string;
  job: string
  updatedAt : Date
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,) { }
  checkoutForm = this.formBuilder.group({
    name: '',
    job: ''
  })
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '0';
    this.userService.getUser(this.id).subscribe(res => {
      this.checkoutForm.setValue({
        name: `${res.data.first_name} ${res.data.last_name}`,
        job: ''
      })
    });
  }
  goBack(): void {
    this.router.navigateByUrl('/users');
  }
  onSubmit(): void {
    if (this.checkoutForm.value.name && this.checkoutForm.value.job) {
      const getRequest = this.userService.updateUser(this.id, this.checkoutForm.value).pipe(
        map((elem: any) => {
          return { ...elem, id:this.id ,updatedAt: moment(elem.updatedAt).format('MM/DD/YYYY HH:mm') }
        })
      );
      getRequest.subscribe((res) => {
        if (res) {
          this.dialog.open(DialogUpdateUser, { data: res });
          this.checkoutForm.reset();
        }
      })
    }
  }
}
/*Modal com os dados do usuário*/
@Component({
  styleUrls: ['./edit.component.css'],
  selector: 'dialog-update.user',
  templateUrl: 'dialog-update-user.html',
})
export class DialogUpdateUser {
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
