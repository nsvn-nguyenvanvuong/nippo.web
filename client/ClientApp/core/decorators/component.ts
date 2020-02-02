import { $, ko } from 'core/providers';
import { router } from 'core/apps/route';

import { $const, updateResouces } from 'core/plugins/configs';

export function component(params: IComponentOption) {
    const { url, name, resources } = params
        , title = !!url ? (params.title || params.name) : null
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
                        , $parent = ko.dataFor(element);

                    if (title) {
                        router.title(title);
                    }

                    Object.defineProperty(vm, '$el', { value: element });

                    Object.defineProperty(vm, 'fetch', { value: $.ajax });

                    Object.defineProperty(vm, '$const', { value: $const });

                    Object.defineProperty(vm, 'router', { value: router.goto });

                    Object.defineProperty(vm, '$parent', { value: $parent });

                    if (typeof vm.created === 'function') {
                        vm.created.apply(vm, [params, element]);
                    }

                    if (typeof vm.koDescendantsComplete === 'undefined') {
                        Object.defineProperty(vm, 'koDescendantsComplete', {
                            value: function mounted(element: HTMLElement) {

                                if (typeof vm.mounted === 'function') {
                                    vm.mounted.apply(vm, [element]);
                                }
                            }
                        });
                    }

                    Object.defineProperty(vm, 'dispose', {
                        value: function dispose() {
                            if (typeof $disposed === 'function') {
                                $disposed.apply(vm, []);
                            }

                            if (typeof vm.destroyed === 'function') {
                                vm.destroyed.apply(vm, []);
                            }
                        }
                    });

                    return vm;
                }
            }
        });
    }
}