import { Component, OnInit } from '@angular/core';
import {AutoFormMasterFunctionComponent} from '../master-function/auto-form-master-function.component';
import {FormHttpRequestService} from '../../service/form-http-request.service';
import {LockScreenService} from '../../service/lock-screen.service';

@Component({
  selector: 'lb12-auto-form',
  templateUrl: './auto-form.component.html',
  styleUrls: ['./auto-form.component.css']
})
export class AutoFormComponent extends AutoFormMasterFunctionComponent implements OnInit {
  constructor(private http: FormHttpRequestService, private lockScr:LockScreenService) {
    super(http, lockScr)
  }
}
