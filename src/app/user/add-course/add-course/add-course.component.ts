import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent, DeleteComponent } from '../course-dialog/course-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
deleteButton() {
throw new Error('Method not implemented.');
}
  courses: any[] = [];
  private idCounter = 1;
  displayedColumns: string[] = ['id', 'name', 'duration', 'actions'];
  hide=false;

  constructor(public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService) {
    // localStorage.setItem('storedCourses', JSON.stringify({ id: 1, name: 'ECE', duration: '4 Weeks' }));
    const storedCourses = localStorage.getItem('storedCourses');
    const storedId = localStorage.getItem('idCounter');
    this.idCounter = storedId ? parseInt(storedId) : 1;
    this.courses = storedCourses ? JSON.parse(storedCourses) : [];
    // console.log('here');
    // this.courses = storedCourses ? JSON.parse(storedCourses) : []; 

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
          result.id = this.idCounter++;
          this.courses.push(result);
          localStorage.setItem('storedIdCounter', this.idCounter.toString())
          localStorage.setItem('storedCourses', JSON.stringify(this.courses));
          this.toastr.success("Course Added successfully");
        }
      }
    );
  }

  //edit courses
  editCourse(course: any) {
    var dialogRef = this.dialog.open(CourseDialogComponent, {
      // width:'250px',
      data: { course }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.courses = this.courses.map(c => c.id === result.id ? result : c);
          localStorage.setItem('storedCourses', JSON.stringify(this.courses));
          this.toastr.success("Course Edited successfully");
        }
      }
    );

  }
  //delete courses
  deleteCourse(courseId: number) {
    var dialogRef = this.dialog.open(DeleteComponent, {
      // width:'250px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.courses = this.courses.filter(c => c.id !== courseId);
          localStorage.setItem('storedCourses', JSON.stringify(this.courses));
          this.toastr.success("Course Delete successfully");
        }
      }
    );

  }
}

