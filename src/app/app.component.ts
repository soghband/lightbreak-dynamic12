import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'lbdynamic7';
  constructor(private router: Router) {
  
  
  }
  ngOnInit() {
    timer(100).subscribe(() => {
      if (this.router.url == "/") {
        this.router.navigateByUrl('/main/ui-editor').then();
      }
    })
  }
}
