import { _, $, ko } from 'core/providers';
import { router } from 'core/apps/route';
import { RootApp } from 'core/apps/root';

export function component(options: IComponentOption) {
    const { url, name } = options
        , template = typeof options.template === 'string' ? options.template : (options.template as any).default;

    if (!!url) {
        router.register(name, url);
    }

    return function (constructor: ComponentConstructor) {
        ko.components.register(options.name, {
            template,
            viewModel: {
                createViewModel: (params: any, elementRef: ElementRef) => {
                    const vm = new constructor()
                        , { element, templateNodes } = elementRef
                        , $parent: IViewModel = ko.dataFor(element)
                        , mixins: IMixinOption[] = (ko.mixin as any)['__mixeds'];

                    if ($parent &&
                        typeof $parent.$children === 'object' &&
                        typeof $parent.$children.push === 'function') {

                        $parent.$children.push(vm);
                    }

                    Object.defineProperty(vm, '$el', { value: element });

                    Object.defineProperty(vm, '$root', {
                        get() {
                            let $root = $parent;

                            while ($parent.$parent) {
                                $root = $parent.$parent;
                            }

                            return $root || $parent;
                        }
                    });

                    Object.defineProperty(vm, '$parent', { value: $parent });

                    Object.defineProperty(vm, '$children', { value: [] });

                    Object.defineProperty(vm, '$options', { value: options });

                    Object.defineProperty(vm, '$nextTick', { value: ko.tasks.schedule });

                    Object.defineProperty(vm, '$forceUpdate', { value: ko.tasks.runEarly });

                    // call created function
                    if (typeof vm.created === 'function') {
                        _.each(mixins, (mix) => {
                            if (typeof mix.created === "function") {
                                (mix.created as any).apply(vm, [params, element, templateNodes]);
                            }
                        });

                        _.each(options.mixins, (mix) => {
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

                                _.each(options.mixins, (mix) => {
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

                            _.each(options.mixins, (mix) => {
                                if (typeof mix.destroyed === "function") {
                                    (mix.destroyed as any).apply(vm, []);
                                }
                            });

                            if (typeof vm.destroyed === 'function') {
                                vm.destroyed.apply(vm, []);
                            }

                            if ($parent &&
                                typeof $parent.$children === 'object' &&
                                typeof $parent.$children.splice === 'function') {
                                const $index = $parent.$children.indexOf(vm);

                                $parent.$children.splice($index, 1);
                            }
                        }
                    });

                    return vm;
                }
            }
        });
    }
}