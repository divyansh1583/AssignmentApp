import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatTable } from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {

  @ViewChild('table') table: MatTable<Element> | null=null;
  displayedColumns: string[] = ['id', 'name', 'duration', 'actions'];
  courses: any[] = [];

  constructor(private courseService: CourseService, public dialog: MatDialog, private cdr: ChangeDetectorRef) { }
  // constructor(public dialog: MatDialog){}
  ngOnInit(): void {
    // this.cdr.detectChanges();
    this.loadCourses();
  }

  loadCourses() {
    this.courses = this.courseService.getCourses();
  }

  //add courses
  addCourse() {
    var dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '350px',
      data: { course: { name: '', duration: '' } },
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.courseService.addCourse(result);
          this.loadCourses();
          this.table?.renderRows();
        }
      }
    );
  }

  //edit courses
  editCourse(course:any) {
    var dialogRef = this.dialog.open(CourseDialogComponent,{
      // width:'250px',
      data:{course}
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result){
          this.courseService.updateCourse(result);
          this.loadCourses();
          this.table?.renderRows();
        }
      }
    );
  }
  //delete courses
  deleteCourse(courseId:number) {
    var dialogRef=this.dialog.open(DeleteDialogComponent,{
      // width:'250px'
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result){
          this.courseService.deleteCourse(courseId);
          this.loadCourses();
          this.table?.renderRows();
        }
      }
    );
  }
}
