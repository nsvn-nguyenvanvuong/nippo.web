import { component } from 'core/decorators';

@component({
    name: "page-404",
    template: require("./index.html").default
})
export class Page404ViewModel { }