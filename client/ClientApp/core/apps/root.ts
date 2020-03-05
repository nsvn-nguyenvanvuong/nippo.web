import { $, ko } from 'core/providers';
import { router, params } from 'core/apps/route';

class RootViewModel {
    public mode: ko.Observable<string> = ko.observable('view');
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
            view.setAttribute('class', 'container-fluid p-3');
        }

        view.setAttribute('data-bind', `component: { name: router, params }`);

        if (!body.contains(view)) {
            body.prepend(view);
        }

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
    applyBindings(name: string, params: any = {}, config: { size: 'lg' }) {
        return new Promise((resolve: (result?: any) => void) => {
            const $el = $('<div>', {
                'class': 'modal fade',
                'tabindex': '-1',
                'html': `<div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" data-bind="i18n: name"></h5>
                            <button type="button" class="close" data-bind="click: function() { $close(); }" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" data-bind="component: { name, params }"></div>
                    </div>
                </div>`
            })
                , $vm = {
                    name,
                    params,
                    mode: ko.observable('modal'),
                    $close: function () {
                        const evt = 'hidden.bs.modal';

                        resolve();

                        $el.one(evt, () => $el.remove());
                        ko.tasks.schedule(() => $el.modal('hide'));
                    }
                };

            Object.assign(params, { '$close': resolve });

            $el.appendTo(document.body);
            ko.applyBindings($vm, $el.get(0));

            $el.find('.modal-body .modal-footer')
                .appendTo($el.find('.modal-content'));

            ko.tasks.schedule(() => $el.modal('show'));
        });
    }
};