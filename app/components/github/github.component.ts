import { Component } from 'angular2/core';
import { Router, RouteConfig, ROUTER_PROVIDERS } from 'angular2/router';
import { GithubService } from './github.service';
import { ReposComponent } from './components/repos/repos.component';
import { UsersComponent } from './components/users/users.component';

@Component({
  selector: 'github',
  template: `
    <h2>{{title}}</h2>
    <a (click)="gotoRepos()">Repos</a>
    <a (click)="gotoUsers()">Users</a>
    <router-outlet></router-outlet>`
  ,
  directives: [
    ReposComponent,
    UsersComponent
  ],
  providers: [
    ROUTER_PROVIDERS,
    GithubService
  ]
})

@RouteConfig([
  { path: '/repos', component: ReposComponent, name: 'Repos' },
  { path: '/users', component: UsersComponent, name: 'Users' }
])

export default class GithubComponent {
  title: string;

  constructor(private _router: Router) {
    this.title = 'Github stuff..';
  }

  gotoRepos() {
    this._router.navigate(['Github', 'Repos']);
  }

  gotoUsers() {
    this._router.navigate(['Github', 'Users']);
  }
}
