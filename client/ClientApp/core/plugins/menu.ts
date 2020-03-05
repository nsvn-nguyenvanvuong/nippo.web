import { $, ko } from 'core/providers';

import { $const, $menu } from 'core/plugins/configs';

ko.use({
    install: () => {
        ko.mixin({
            created() {
                const vm: IViewModel = this as any;

                Object.defineProperty(vm, '$menu', { value: $menu });

                Object.defineProperty(vm, '$const', { value: $const });
            },
            destroyed() {
                const vm: IViewModel = this as any;

                if (!!vm.$options.url && $(vm.$el).find('.function-area').length) {
                    $menu.func(false);
                }
            }
        })
    }
});