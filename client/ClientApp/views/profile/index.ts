import { ko } from 'core/providers';
import { component } from 'core/decorators';

@component({
    name: "profile",
    url: '/profile/:name?',
    template: require("./index.html")
})
export class ProfileViewModel extends ko.ViewModel {
    name: Observable<string> = ko.observable('');

    created(params: { name: string; }) {
        const vm = this;

        if (params.name) {
            vm.name(params.name);
        }
    }
}