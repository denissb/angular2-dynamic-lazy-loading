import { Component } from 'angular2/core';
import { Router, RouteConfig, ROUTER_PROVIDERS } from 'angular2/router';
import { TwitterService } from './twitter.service';
import { AngularComponent } from './components/angular2/angular2.component';
import { JSComponent } from './components/js/js.component';

@Component({
    selector: 'twitter',
    template: `
      <h2>{{title}}</h2>
      <a (click)="gotoJS()">JS</a>
      <a (click)="gotoAngular2()">Angular2</a>
      <router-outlet></router-outlet>
    `,
    directives: [
        AngularComponent,
        JSComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        TwitterService
    ]
})

@RouteConfig([
  { path: '/js', name: 'JS', component: JSComponent },
  { path: '/ng2', name: 'Angular2', component: AngularComponent }
])

export default class TwitterComponent {
  title: string;

  constructor(private _router: Router) {
      this.title = 'Twitter stuff..';
  }

  gotoJS() {
      this._router.navigate(['Twitter', 'JS']);
  }

  gotoAngular2() {
      this._router.navigate(['Twitter', 'Angular2']);
  }
}
