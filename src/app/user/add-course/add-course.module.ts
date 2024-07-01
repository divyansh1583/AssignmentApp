import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCourseRoutingModule } from './add-course-routing.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AddCourseComponent,
    CourseDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    AddCourseRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatInputModule 
  ]
})
export class AddCourseModule { }
