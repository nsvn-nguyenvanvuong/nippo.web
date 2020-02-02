import { ko } from 'core/providers';
import { component } from 'core/decorators';
import { ViewModel } from 'core/apps/viewmodel';

@component({
    name: "home",
    url: '/home',
    title: "home",
    template: require('./index.html'),
    resources: {
        en: {
            'home': 'Home',
            'abc': 'Hello'
        },
        vi: {
            'home': 'Trang chu',
            'abc': 'Xin chao'
        }
    }
})
export class HomeViewModel extends ViewModel {
    name = ko.observable('Hello world!').extend({ logChange: 'first name:' });

    number = ko.observable(100);
    date = ko.observable(new Date());

    times: ObservableArray<number> = ko.observableArray();

    clickTime() {
        const vm = this;

        vm.times.push(new Date().getTime());
    }

    created() {
        this.$fetch('https://jsonplaceholder.typicode.com/posts/42', {
            method: 'GET',
            dataType: 'JSON',
            data: {}
        });

        Object.assign(window, { vm: this });

        // console.log('created');
    }

    mounted() {
        // console.log('mounted');

        Object.assign(window, { vm: this });
    }

    destroyed() {
        // console.log('destroyed');
    }
}