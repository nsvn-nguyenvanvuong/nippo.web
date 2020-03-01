import { $, ko } from 'core/providers';
import { $const } from 'core/plugins/configs';
import { ViewModel } from 'core/apps/viewmodel';
import { router, params } from 'core/apps/route';

class RootViewModel extends ViewModel {
    public router: IRouter = router;
    public params: Observable<IParams | null> = params;

    home(name: string) {
        const vm = this;

        vm.router.home(name);

        if (!ko.components.isRegistered(name)) {
            ko.components.register(name, {
                template: '<h1>Home page!</h1><pre data-bind="text: ko.toJSON(params, null, 4)"></pre>',
                viewModel: {
                    createViewModel: (params: any) => ({ params })
                }
            });
        }

        return vm;
    }

    page404(name: string) {
        const vm = this;

        vm.router.page404(name);

        if (!ko.components.isRegistered(name)) {
            ko.components.register(name, {
                template: '<h1>Not found!</h1><pre data-bind="text: ko.toJSON(params, null, 4)"></pre>',
                viewModel: {
                    createViewModel: (params: any) => ({ params })
                }
            });
        }

        return vm;
    }

    applyBindings(element: null | string | Element | HTMLElement = null) {
        const vm = this
            , body = document.body
            , $title = document.querySelector('head>title')
            , view = typeof element === 'string' ?
                (document.querySelector(element) || document.createElement('div')) :
                (element instanceof HTMLElement ? element : document.createElement('div'));

        vm.router.bootstrap();

        if (!view.getAttribute('class')) {
            view.setAttribute('class', 'container-fluid');
        }

        view.setAttribute('data-bind', `component: { name: router, params }`);

        if (!body.contains(view)) {
            body.prepend(view);
        }

        Object.defineProperty(vm, '$el', { value: view });

        Object.defineProperty(vm, '$fetch', { value: $.ajax });

        Object.defineProperty(vm, '$const', { value: $const });

        Object.defineProperty(vm, '$router', { value: router.goto });

        Object.defineProperty(vm, '$root', { value: vm });

        Object.defineProperty(vm, '$parent', { value: vm });

        Object.defineProperty(vm, '$children', { value: [] });

        Object.defineProperty(vm, '$nextTick', { value: ko.tasks.schedule });

        Object.defineProperty(vm, '$forceUpdate', { value: ko.tasks.runEarly });

        ko.applyBindings(vm, document.body);

        if ($title) {
            if (ko.bindingHandlers.i18n.init) {
                ko.bindingHandlers.i18n.init.apply(null, [$title, () => router.title, <ko.AllBindings>{}, {}, <ko.BindingContext>{}]);
            }
        }

        return vm;
    }
}

export const RootApp = new RootViewModel();

export const ModalApp = {
    applyBindings(name: string, params: any, config: { size: 'lg' }) {
        const vm = { name, params }
            , $el = $('<div>', {
                'class': 'modal fade',
                'tabindex': '-1',
                'html': `<div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" data-bind="i18n: name"></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" data-bind="component: { name, params }"></div>
                    </div>
                </div>`
            });

        $el.appendTo(document.body);
        ko.applyBindings(vm, $el.get(0));

        ko.tasks.schedule(() => $el.modal('show'));
    }
};