import { Component, Input, OnInit } from '@angular/core';
import { Specialty } from 'src/app/models/specialty';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.scss', '../../app.component.scss']
})
export class ClassViewComponent implements OnInit {

  @Input() item: Specialty= {} as Specialty;

  constructor() { }

  ngOnInit(): void {
  }

}
