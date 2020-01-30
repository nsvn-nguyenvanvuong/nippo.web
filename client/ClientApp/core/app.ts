import { ko } from './providers';
import { router } from './route';


ko.components.register('home', {
    template: '<div>Home</div>',
    viewModel: function (params: any) {

    }
});

class RootApp {
    public router: IRouter = router;

    applyBindings(home?: string, notFound?: string) {
        const vm = this
            , view = document.createElement('div');

        view.setAttribute('data-bind', `{ component: router, params: router.params }`);

        document.body.prepend(view);

        vm.router.register('home', '/home');

        vm.router.set(home, notFound);

        setTimeout(() => ko.applyBindings(vm, document.body), 1);
    }
}

export const App = new RootApp();


Object.assign(window, { ko, App });