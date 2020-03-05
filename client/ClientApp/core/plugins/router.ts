import { ko } from 'core/providers';
import { router } from 'core/apps/route';

ko.use({
    install: () => {
        ko.mixin({
            created() {
                const vm: IViewModel = this as any;

                Object.defineProperty(vm, '$router', { value: router.goto });
            },
            mounted(element: HTMLElement) {
                const vm: IViewModel = this as any;

                if (!!vm.$options.url && !element.closest('.modal')) {
                    router.title(vm.$options.title || vm.$options.name);
                }
            }
        });
    }
});