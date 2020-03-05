import { $, ko } from 'core/providers';

const TSLTOR = '[data-toggle="tooltip"]'
    , PSLTOR = '[data-toggle="popover"]'
    , DSLTOR = '.dropdown [data-toggle="false"]';

ko.use({
    install: () => {
        ko.mixin({
            mounted(element: HTMLElement) {
                const vm: IViewModel = this as any;

                $(element).find(DSLTOR).on('click', (evt: Event) => evt.stopPropagation());

                // need to be enabled manually [tooltip] & [popover]
                vm.$nextTick(() => {
                    $(element).find(TSLTOR).tooltip();
                    $(element).find(PSLTOR).popover();

                    // hide all data-bind of ko
                    $(element)
                        .removeAttr('data-bind')
                        .find('[data-bind]')
                        .removeAttr('data-bind');
                });
            },
            destroyed() {
                const vm: IViewModel = this as any
                    , element: HTMLElement = vm.$el;

                // need to be disable manually [tooltip] & [popover]
                $(element).find(TSLTOR).tooltip('dispose');
                $(element).find(PSLTOR).popover('dispose');
            }
        })
    }
});