import { ko } from './providers';
import { router } from './route';


ko.components.register('home', {
    template: '<div>Home</div>',
    viewModel: function (params: any) {

    }
});

router.register('home', '/home');

class RootApp {
    public router: IRouter = router;

    start(home?: string, notFound?: string) {
        const vm = this
            , view = document.createElement('div');

        view.setAttribute('data-bind', `{ component: router, params: router.params }`);

        document.body.prepend(view);

        vm.router.set(home, notFound);

        setTimeout(() => ko.applyBindings(vm, document.body), 1);
    }
}

export const App = new RootApp();