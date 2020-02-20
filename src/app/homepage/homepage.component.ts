import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  constructor(private router: Router) { }

  goToAuthPage() {
    this.router.navigateByUrl('/auth', {replaceUrl: true});
  }
}
