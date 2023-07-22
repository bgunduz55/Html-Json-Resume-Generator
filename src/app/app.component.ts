import { Component } from '@angular/core';
import data from '../assets/my-resume-data.json';
import { SpecialtyList } from './models/specialtyList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Html-Json-Resume';
  specialtyList: SpecialtyList = data;
  
  constructor(){

  }
  ngOnInit(){
    console.log(this.specialtyList);
  }
}
