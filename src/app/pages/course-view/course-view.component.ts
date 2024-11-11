import { Component } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent {

  course_info: any;
  constructor(private service: ApiService){

    this.service.course$.subscribe(course_info=>{
      this.course_info = course_info;
      console.log(course_info);
    })
  }
}
