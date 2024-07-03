import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: any[] = [];
  private idCounter = 1;

  
  constructor() {
    const storedCourses = sessionStorage.getItem('courses');
    this.courses = storedCourses ? JSON.parse(storedCourses) : [];
    this.idCounter = this.courses.length > 0 ? Math.max(...this.courses.map(course => course.id)) + 1 : 1;
    
    //initialized data
    this.addCourse({name:'CS',duration:'2 weeks'});
  }

  //get all courses
  // getCourses() {
  //   return this.courses;
  // }

  //add new course
  //add data type
  addCourse(course:any){
    console.log("From add"+JSON.stringify(course));
    course.id=this.idCounter++; //post increment operator: first value is assigned than updated
    this.courses.push(course);
    this.updateSessionStorage();
  }
  
  //update course
  updateCourse(course:any){
    this.courses = this.courses.map(c => c.id === course.id ? course : c);
    this.updateSessionStorage();
  }

  //delete course
  deleteCourse(id:number){
    this.courses = this.courses.filter(c => c.id !== id);
    this.updateSessionStorage();
  }

  //update seesion storage to current storage
  updateSessionStorage() {
    sessionStorage.setItem('storedCourses',JSON.stringify(this.courses));
  }
}
