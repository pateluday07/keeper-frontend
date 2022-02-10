import { Component } from '@angular/core';
import { RoutePath } from './enum/route-path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keeper-frontend';
  readonly homeRoute = RoutePath.Home;
}
