import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: any[] = [];
  private idCounter = 1;

  
  constructor() {
    const storedCourses = sessionStorage.getItem('courses');
    //stores courses if present else empty list
    this.courses = storedCourses ? JSON.parse(storedCourses) : [];
    //get new unique id by making array of ids this.courses.map(course => course.id)
    //then spreding them ... spread operator and findin max by math.max
    this.idCounter = this.courses.length > 0 ? Math.max(...this.courses.map(course => course.id)) + 1 : 1;
  }

  //get all courses
  getCourses() {
    return this.courses;
  }

  //add new course
  //add data type
  addCourse(course:any){
    course.id=this.idCounter++ //post increment operator: first value is assigned than updated
    this.courses.push(course);
    this.updateSessionStorage();
  }
  updateSessionStorage() {
    sessionStorage.setItem('storedCourses',JSON.stringify(this.courses));
  }
}
