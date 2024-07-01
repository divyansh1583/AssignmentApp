import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {
  course: any = {};

  constructor(public dialogRef:MatDialogRef<CourseDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any){
    this.course={...data.course};
  }

  onSave(){
    this.dialogRef.close(this.course);
  }

  onCancel(){
    this.dialogRef.close();
  }
}
