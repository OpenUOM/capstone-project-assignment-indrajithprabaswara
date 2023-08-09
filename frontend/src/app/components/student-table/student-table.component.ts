import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})

export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;

  studentData = [];
  selected: any;

  constructor(private service: AppServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudentData(); 
  }

  addNewStudent(){
    this.router.navigate(['addStudent']);
  }

  editStudent(id) {
    this.router.navigate(['editStudent'], {
      state: { id }
    });
  }  

  fetchStudentData() {
    this.service.getStudentData().subscribe(
      response => {
        this.studentData = Object.keys(response).map(key => [response[key]]);
      },
      error => {
        console.log('ERROR - ', error);
      }
    );
  }

  deleteStudent(studentId){
    const student = { id: studentId };

    this.service.deleteStudent(student).subscribe(() => {
      this.fetchStudentData();
    });
  }

  search(query) {
    if (!query) {
      return this.fetchStudentData();
    }

    this.studentData = this.studentData.filter(student => {
      return student[0].name.toLowerCase().includes(query.toLowerCase());
    });
  }

}