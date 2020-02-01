import { ko } from 'core/providers';
import { router } from 'core/apps/route';

export function component(params: IComponentOption) {
    const resource = !!params.url ? (params.title || params.name) : null;

    if (!!params.url) {
        router.register(params.name, params.url);
    }

    return function (constructor: ComponentConstructor) {
        ko.components.register(params.name, {
            template: params.template,
            viewModel: {
                createViewModel: (params: any, elementRef: ElementRef) => {
                    const vm = new constructor()
                        , $disposed = vm.dispose;

                    if (resource) {
                        router.title(resource);
                    }

                    if (typeof vm.created === 'function') {
                        vm.created.apply(vm, [params, elementRef.element]);
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

                    Object.defineProperty(vm, '$el', { value: elementRef.element });

                    return vm;
                }
            }
        });
    }
}