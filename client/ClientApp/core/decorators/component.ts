import { ko } from 'core/providers';
import { router } from 'core/apps/route';

export function component(params: IDecoratorComponent) {
    if (!!params.url) {
        router.register(params.name, params.url);
    }

    return function (constructor: ComponentConstructor) {
        const vm: any = new constructor();

        ko.components.register(params.name, {
            synchronous: false,
            template: params.template,
            viewModel: {
                createViewModel: (params: any, elementRef: ElementRef) => {
                    if (typeof vm.created === 'function') {
                        vm.created.apply(vm, [params, elementRef.element]);
                    }

                    Object.defineProperty(vm, 'koDescendantsComplete', {
                        value: function mounted(element: HTMLElement) {
                            if (typeof vm.mounted === 'function') {
                                vm.mounted.apply(vm, [element]);
                            }
                        }
                    });

                    if (typeof vm.destroyed === 'function' && typeof vm.dispose === 'undefined') {
                        vm.dispose = function () {
                            vm.destroyed.apply(vm, []);
                        }
                    }

                    return vm;
                }
            }
        });

        return vm;
    }
}