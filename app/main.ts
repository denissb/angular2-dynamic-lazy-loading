import { provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser'
import AsyncProvider from './utils/async.provider'
import AppComponent from './components/app.component'

AsyncProvider.SETUP('my-app', './app/components').then(() => {
    // Now we are ready to initialize the app with lazy loaded components
    System.import('./app/components/app.component').then((module) => {
       bootstrap(module.default);
    });
});
