import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {

  @ViewChild('table') table: MatTable<Element> | undefined;
  displayedColumns: string[] = ['id', 'name', 'duration', 'actions'];
  courses: any[] = [];

  constructor(private courseService: CourseService, public dialog: MatDialog, private cdr: ChangeDetectorRef) { }
  // constructor(public dialog: MatDialog){}
  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courses = this.courseService.getCourses();
  }

  //add courses
  addCourse() {
    var dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '250px',
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
      width:'250px',
      data:{course}
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result){
          this.courseService.updateCourse(result);
        }
      }
    );
  }
  //delete courses
  deleteCourse(courseId:number) {
    throw new Error('Method not implemented.');
  }
}
