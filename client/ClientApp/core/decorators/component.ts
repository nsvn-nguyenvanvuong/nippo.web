import { $, ko } from 'core/providers';
import { router } from 'core/apps/route';
import { RootApp, ModalApp } from 'core/apps/root';
import { ViewModel } from 'core/apps/viewmodel';
import { $const, $menu, updateResouces } from 'core/plugins/configs';

const TSLTOR = '[data-toggle="tooltip"]'
    , PSLTOR = '[data-toggle="popover"]'
    , DSLTOR = '.dropdown [data-toggle="false"]';

export function component(params: IComponentOption) {
    const { url, name, resources } = params
        , title = params.title || params.name
        , template = typeof params.template === 'string' ? params.template : (params.template as any).default;

    if (!!resources) {
        updateResouces(resources);
    }

    if (!!url) {
        router.register(name, url);
    }

    return function (constructor: ComponentConstructor) {
        ko.components.register(params.name, {
            template,
            viewModel: {
                createViewModel: (params: any, elementRef: ElementRef) => {
                    const vm = new constructor()
                        , $close = (params || {}).$close
                        , $disposed = vm.dispose
                        , { element, templateNodes } = elementRef
                        , $parent: ViewModel = ko.dataFor(element);

                    if (!!url && !element.closest('.modal')) {
                        router.title(title);
                    }

                    if ($parent &&
                        typeof $parent.$children === 'object' &&
                        typeof $parent.$children.push === 'function') {
                        $parent.$children.push(vm);
                    }

                    Object.defineProperty(vm, '$el', { value: element });

                    Object.defineProperty(vm, '$fetch', { value: $.ajax });

                    Object.defineProperty(vm, '$menu', { value: $menu });

                    Object.defineProperty(vm, '$const', { value: $const });

                    Object.defineProperty(vm, '$router', { value: router.goto });

                    Object.defineProperty(vm, '$root', { value: RootApp });

                    Object.defineProperty(vm, '$parent', { value: $parent });

                    Object.defineProperty(vm, '$children', { value: [] });

                    Object.defineProperty(vm, '$nextTick', { value: ko.tasks.schedule });

                    Object.defineProperty(vm, '$forceUpdate', { value: ko.tasks.runEarly });

                    Object.defineProperty(vm, '$close', {
                        value: function close(result?: any) {
                            const evt = 'hidden.bs.modal'
                                , $modal = $(element).closest('.modal.show');

                            if ($modal.length) {
                                if ($close) {
                                    $close.apply(null, [result]);
                                }

                                $modal.one(evt, () => $modal.remove());

                                ko.tasks.schedule(() => $modal.modal('hide'));
                            }
                        }
                    });

                    if (!!url) {
                        Object.defineProperty(vm, '$errors', { value: [] });

                        Object.defineProperty(vm, '$valid', {
                            get() {
                                const $errors: any[] = (vm as any).$errors;

                                return $errors.length === 0;
                            }
                        });

                        Object.defineProperty(vm, '$validate', {
                            value: function validate() {
                                return new Promise((resolve: (value: boolean) => void) => {
                                    resolve(true);
                                });
                            }
                        });
                    } else {
                        Object.defineProperty(vm, '$valid', { value: true });

                        Object.defineProperty(vm, '$validate', {
                            value: function validate() {
                                return new Promise((resolve: (value: boolean) => void) => {
                                    resolve(true);
                                });
                            }
                        });
                    }

                    Object.defineProperty(vm.$validate, 'setError', {
                        value: function setError() {

                        }
                    });

                    Object.defineProperty(vm, '$modal', {
                        value: function modal(name: string, params?: any) {
                            return ModalApp.applyBindings(name, params, { size: 'lg' });
                        }
                    });

                    // call created function
                    if (typeof vm.created === 'function') {
                        if (params && params.$close) {
                            delete params.$close;
                        }

                        vm.created.apply(vm, [params, element, templateNodes]);
                    }

                    // call mounted function
                    if (typeof vm.koDescendantsComplete === 'undefined') {
                        Object.defineProperty(vm, 'koDescendantsComplete', {
                            value: function mounted(element: HTMLElement) {
                                if (typeof vm.mounted === 'function') {
                                    vm.mounted.apply(vm, [element, templateNodes]);
                                }

                                if (element.tagName === name.toUpperCase()) {
                                    if (!element.classList.contains('d-block')) {
                                        element.classList.add('d-inline-block');
                                    }
                                }

                                $(DSLTOR).on('click', (evt: Event) => evt.stopPropagation());

                                // need to be enabled manually [tooltip] & [popover]
                                vm.$nextTick(() => {
                                    $(TSLTOR).tooltip();
                                    $(PSLTOR).popover();

                                    // hide all data-bind of ko
                                    $(element)
                                        .removeAttr('data-bind')
                                        .find('[data-bind]')
                                        .removeAttr('data-bind');
                                });
                            }
                        });
                    }

                    // call destroyed function
                    Object.defineProperty(vm, 'dispose', {
                        value: function dispose() {
                            if (typeof $disposed === 'function') {
                                $disposed.apply(vm, []);
                            }

                            if (typeof vm.destroyed === 'function') {
                                vm.destroyed.apply(vm, []);
                            }

                            if ($parent &&
                                typeof $parent.$children === 'object' &&
                                typeof $parent.$children.splice === 'function') {
                                const $index = $parent.$children.indexOf(vm);

                                $parent.$children.splice($index, 1);
                            }

                            // need to be disable manually [tooltip] & [popover]
                            $(TSLTOR).tooltip('dispose');
                            $(PSLTOR).popover('dispose');

                            if (!!url && $(element).find('.function-area').length) {
                                $menu.func(false);
                            }
                        }
                    });

                    return vm;
                }
            }
        });
    }
}