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
  courses: any[] = [];
  private idCounter = 1;
  @ViewChild('table') table: MatTable<Element> | null=null;
  displayedColumns: string[] = ['id', 'name', 'duration', 'actions'];
  // courses: any[] = [];

  constructor( public dialog: MatDialog, private cdr: ChangeDetectorRef) {
    const storedCourses = localStorage.getItem('courses');
    const storedId = localStorage.getItem('idCounter');
    this.courses = storedCourses ? JSON.parse(storedCourses) : [];
    // this.idCounter = this.courses.length > 0 ? Math.max(...this.courses.map(course => course.id)) + 1 : 1;
    this.idCounter=storedId?parseInt(storedId):1;


   }
 
  ngOnInit(): void {
    // this.cdr.detectChanges();
   
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
          result.id=this.idCounter++;
          this.courses.push(result);
          localStorage.setItem('storedIdCounter',this.idCounter.toString()) 
          localStorage.setItem('storedCourses',JSON.stringify(this.courses));
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
          this.courses=this.courses.map(c => c.id === result.id ? result : c);
          localStorage.setItem('storedCourses',JSON.stringify(this.courses));
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
          this.courses = this.courses.filter(c => c.id !== courseId);
          localStorage.setItem('storedCourses',JSON.stringify(this.courses));
        }
      }
    );
  }
}
