import { ko } from 'core/providers';
import { component } from 'core/decorators';
import { ViewModel } from 'core/apps/viewmodel';

@component({
    name: "home",
    url: '/home',
    title: "home",
    template: require("./index.html").default
})
export class HomeViewModel extends ViewModel {
    name = ko.observable('Hello world!');

    number = ko.observable(100);
    date = ko.observable(new Date());

    dispose = ko.observable('');

    created() {
        this.fetch('https://jsonplaceholder.typicode.com/posts/42', {
            method: 'GET',
            dataType: 'JSON',
            data: {}
        });
    }
}