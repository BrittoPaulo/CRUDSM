import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserService } from '../user.service';

export interface DialogData {
  id: string;
  name: string;
  remove: boolean
  feedback : string
}
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteUser(id:string):void{
    this.data.remove = true;
    this.userService.deleteUser(id).subscribe((res) => {    
        this.data.remove = true;
    })
  }

}
