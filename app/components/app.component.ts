import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from 'angular2/router';
import AsyncProvider from '../utils/async.provider'

@Component({
    selector: 'my-app',
    directives: [
        ROUTER_DIRECTIVES,
        AsyncProvider.ASYNC_CONFIG.components
    ],
    providers: [
        ROUTER_PROVIDERS
    ],
    template: AsyncProvider.ASYNC_CONFIG.template
})

@RouteConfig(AsyncProvider.ASYNC_CONFIG.routeConfig)

export default class AppComponent { 
    constructor() {
        console.log('constructed!');
    }
}