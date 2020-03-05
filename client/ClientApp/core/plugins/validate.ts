import { ko } from 'core/providers';

ko.use({
    install: () => {
        ko.mixin({
            created() {
                const vm: IViewModel = this as any;


                if (!!vm.$options.url) {
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
            }
        })
    }
});