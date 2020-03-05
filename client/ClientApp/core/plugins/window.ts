// $window

import { $, ko } from 'core/providers';

const $window: any = Object.defineProperties({}, {
    width: {
        value: ko.observable(window.innerWidth)
    },
    height: {
        value: ko.observable(window.innerHeight)
    },
    scrollX: {
        value: ko.observable(window.scrollX)
    },
    scrollY: {
        value: ko.observable(window.scrollY)
    }
});

ko.use({
    install: () => {
        ko.mixin({
            created() {
                const vm: IViewModel = this as any;

                Object.defineProperty(vm, '$window', { value: $window });

                Object.assign(vm.$window, { 'mode': (vm.$root as any).mode });
            }
        });
    }
});

const $$window = $(window)
    .on('ud.window', () => {
        const {
            scrollX,
            scrollY,
            innerWidth,
            innerHeight
        } = window;

        $window.width(innerWidth);
        $window.height(innerHeight);

        $window.scrollX(scrollX);
        $window.scrollY(scrollY);
    })
    .on('scroll', () => {
        $$window.trigger('ud.window');
    })
    .on('resize', () => {
        $$window.trigger('ud.window');
    });