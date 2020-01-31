import { $, ko } from 'core/providers';
import { ViewModel } from 'core/apps/viewmodel';
import { component } from 'core/decorators/component';

@component({
    name: "profile",
    url: '/profile/:name?',
    template: require("./index.html").default
})
export class ProfileViewModel extends ViewModel {
    name: Observable<string> = ko.observable('');

    created(params: { name: string; }) {
        const vm = this;

        if (params.name) {
            vm.name(params.name);
        }
    }
}