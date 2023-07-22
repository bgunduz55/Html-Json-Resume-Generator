import { Component, OnInit } from '@angular/core';
import data from '../../assets/my-resume-data.json';
import { SpecialtyList } from './../models/specialtyList';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../app.component.scss', './header.component.scss']
})
export class HeaderComponent implements OnInit {
  specialtyList: SpecialtyList = data;
  constructor() { }

  ngOnInit(): void {
  }

}
