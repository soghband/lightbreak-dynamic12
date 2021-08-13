import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'specification-panel',
  templateUrl: './function-specification.component.html',
  styleUrls: ['./function-specification.component.css']
})
export class FunctionSpecificationComponent implements OnInit {
  @Input() using = "";
  @Input() parameter = "N/A";
  constructor() { }

  ngOnInit() {
  }

}
