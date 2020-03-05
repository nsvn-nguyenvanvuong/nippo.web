import { $, ko } from 'core/providers';
import { ModalApp } from 'core/apps/root';

ko.use({
    install: () => {
        ko.mixin({
            created(params: any, element: HTMLElement) {
                const vm: IViewModel = this as any
                    , $close = (params || {}).$close;

                if (params && params.$close) {
                    delete params.$close;
                }

                Object.defineProperty(vm, '$modal', {
                    value: function modal(name: string, params?: any) {
                        return ModalApp.applyBindings(name, params, { size: 'lg' });
                    }
                });

                Object.defineProperty(vm, '$close', {
                    value: function close(result?: any) {
                        const evt = 'hidden.bs.modal'
                            , $modal = $(element).closest('.modal.show');

                        if ($modal.length) {
                            if ($close) {
                                $close.apply(null, [result]);
                            }

                            $modal.one(evt, () => $modal.remove());

                            ko.tasks.schedule(() => $modal.modal('hide'));
                        }
                    }
                });
            }
        });
    }
});