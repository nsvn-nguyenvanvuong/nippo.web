import { $, ko, View, ViewModel } from 'core/providers';

@View({
    name: "home",
    route: "/",
    title: "Home page",
    template: require("./index.html").default
})
export class HomeViewModel extends ViewModel {
    name = ko.observable('Hello world!');

    number = ko.observable(100);
    date = ko.observable(new Date());

    onInit() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/42',
            method: 'GET',
            dataType: 'JSON',
            data: {

            }
        })
            .then((value) => {
                console.log(value);
            })
    }
}