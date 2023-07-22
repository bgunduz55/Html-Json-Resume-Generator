import { Component, Input, OnInit } from '@angular/core';
import { FunctionalInfo } from 'src/app/models/functionalInfo';
import { Specialty } from 'src/app/models/specialty';

@Component({
  selector: 'app-function-view',
  templateUrl: './function-view.component.html',
  styleUrls: ['./function-view.component.scss', '../../app.component.scss']
})
export class FunctionViewComponent implements OnInit {

  @Input() item: FunctionalInfo = {} as FunctionalInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
