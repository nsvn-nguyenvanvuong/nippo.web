import 'reflect-metadata';

import 'popper.js';
import 'bootstrap';

import 'core/index';
import 'views/index';

import { RootApp } from 'core/apps/root';

RootApp
    .home('home')
    .page404('page-404')
    .applyBindings(document.querySelector('#root'));