import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
deleteCourse(arg0: any) {
throw new Error('Method not implemented.');
}
editCourse(_t32: any) {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['id', 'name', 'duration', 'actions'];
  courses: any[] = [];

  constructor(private courseService: CourseService, public dialog: MatDialog, private cdr: ChangeDetectorRef ) {}
  // constructor(public dialog: MatDialog){}
  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courses = this.courseService.getCourses();
  }

  //add courses
  addCourse(){
    var dialogRef=this.dialog.open(CourseDialogComponent,{
      width:'250px',
      data:{course:{name:'',duration:''}},  
    });

    dialogRef.afterClosed().subscribe(
      result=>{
        if(result){
          this.courseService.addCourse(result);
          this.loadCourses();
          this.cdr.detectChanges();
        }
      }
    );
  }
}
