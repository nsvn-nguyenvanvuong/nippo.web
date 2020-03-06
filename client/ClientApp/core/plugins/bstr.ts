import { $, ko } from 'core/providers';

const TSLTOR = '[data-toggle="tooltip"]'
    , PSLTOR = '[data-toggle="popover"]'
    , DSLTOR = '.dropdown [data-toggle="false"]';

ko.use({
    install: () => {
        ko.mixin({
            mounted() {
                const vm: IViewModel = this as any
                    , $el: JQuery<HTMLElement> = $(vm.$el);

                $el
                    .find(DSLTOR)
                    .on('click', (evt: Event) => evt.stopPropagation());

                // need to be enabled manually [tooltip] & [popover]
                ko.tasks.scheduler(() => {
                    $el.find(TSLTOR).tooltip();
                    $el.find(PSLTOR).popover();

                    // hide all data-bind of ko
                    $el.removeAttr('data-bind');

                    $el.find('[data-bind]').removeAttr('data-bind');
                });
            },
            destroyed() {
                const vm: IViewModel = this as any
                    , $el: JQuery<HTMLElement> = $(vm.$el);

                // need to be disable manually [tooltip] & [popover]
                $el.find(TSLTOR).tooltip('dispose');
                $el.find(PSLTOR).popover('dispose');
            }
        })
    }
});