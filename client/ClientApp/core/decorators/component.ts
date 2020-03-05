import { _, $, ko } from 'core/providers';
import { router } from 'core/apps/route';
import { RootApp } from 'core/apps/root';
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
                        , $disposed = vm.dispose
                        , { element, templateNodes } = elementRef
                        , $parent: any = ko.dataFor(element)
                        , mixins: IMixinOption[] = (ko.mixin as any)['__mixeds'];

                    if (!!url && !element.closest('.modal')) {
                        router.title(title);
                    }

                    if ($parent &&
                        typeof $parent.$children === 'object' &&
                        typeof $parent.$children.push === 'function') {
                        $parent.$children.push(vm);
                    }

                    Object.defineProperty(vm, '$el', { value: element });

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

                    // call created function
                    if (typeof vm.created === 'function') {
                        _.each(mixins, (mix) => {
                            if (typeof mix.created === "function") {
                                (mix.created as any).apply(vm, [params, element, templateNodes]);
                            }
                        });

                        vm.created.apply(vm, [params, element, templateNodes]);
                    }

                    // call mounted function
                    if (typeof vm.koDescendantsComplete === 'undefined') {
                        Object.defineProperty(vm, 'koDescendantsComplete', {
                            value: function mounted(element: HTMLElement) {
                                _.each(mixins, (mix) => {
                                    if (typeof mix.mounted === "function") {
                                        (mix.mounted as any).apply(vm, [element, templateNodes]);
                                    }
                                });

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
                            _.each(mixins, (mix) => {
                                if (typeof mix.destroyed === "function") {
                                    (mix.destroyed as any).apply(vm, []);
                                }
                            });

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