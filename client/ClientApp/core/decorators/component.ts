import { $, ko } from 'core/providers';
import { router } from 'core/apps/route';
import { RootApp } from 'core/apps/root';
import { ViewModel } from 'core/apps/viewmodel';
import { $const, updateResouces } from 'core/plugins/configs';


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
            template: `<div role="${params.name}" data-bind="let: { $vm: $data }">${template}</div>`,
            viewModel: {
                createViewModel: (params: any, elementRef: ElementRef) => {
                    const vm = new constructor()
                        , $disposed = vm.dispose
                        , { element } = elementRef
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

                    Object.defineProperty(vm, '$const', { value: $const });

                    Object.defineProperty(vm, '$router', { value: router.goto });

                    Object.defineProperty(vm, '$root', { value: RootApp });

                    Object.defineProperty(vm, '$parent', { value: $parent });

                    Object.defineProperty(vm, '$children', { value: [] });

                    Object.defineProperty(vm, '$nextTick', { value: ko.tasks.schedule });

                    Object.defineProperty(vm, '$forceUpdate', { value: ko.tasks.runEarly });

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
                            return Promise.resolve({});
                        }
                    });

                    // call created function
                    if (typeof vm.created === 'function') {
                        vm.created.apply(vm, [params, element]);
                    }

                    // call mounted function
                    if (typeof vm.koDescendantsComplete === 'undefined') {
                        Object.defineProperty(vm, 'koDescendantsComplete', {
                            value: function mounted(element: HTMLElement) {

                                if (typeof vm.mounted === 'function') {
                                    vm.mounted.apply(vm, [element]);
                                }

                                // need to be enabled manually [tooltip] & [popover]
                                setTimeout(() => {
                                    ($(TSLTOR) as any).tooltip();
                                    ($(PSLTOR) as any).popover();
                                }, 100);

                                $(DSLTOR).on('click', (evt: Event) => evt.stopPropagation());

                                // hide all data-bind of ko
                                $(element)
                                    .removeAttr('data-bind')
                                    .find('[data-bind]')
                                    .removeAttr('data-bind');
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
                            ($(TSLTOR) as any).tooltip('dispose');
                            ($(PSLTOR) as any).popover('dispose');
                        }
                    });

                    return vm;
                }
            }
        });
    }
}