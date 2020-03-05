import { ko } from 'core/providers';

import { $const, $menu } from 'core/plugins/configs';

ko.use({
    install: () => {
        ko.mixin({
            created() {
                const vm = this;

                Object.defineProperty(vm, '$menu', { value: $menu });

                Object.defineProperty(vm, '$const', { value: $const });
            }
        })
    }
});