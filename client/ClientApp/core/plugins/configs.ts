import { $, ko } from 'core/providers';

import vi from '../../resources/vietnam.json';
import en from '../../resources/english.json';

const lang: Observable<string> = ko.observable('vi')
    , langs: ObservableArray<string> = ko.observableArray([''])
    , INVALID: Symbol = Symbol('INVALID')
    , START_TIME: number = new Date().getTime()
    , resources: Observable<IResources> = ko.observable({});

updateResouces(vi);
updateResouces(en);

export { lang, langs, resources };

export function updateResouces($resources: IResources) {
    const $$resources = ko.toJS(resources);

    Object.keys($resources)
        .forEach((k: string) => {
            if (!$$resources[k]) {
                Object.assign($$resources, { [k]: {} });
            }

            Object.assign($$resources[k], $resources[k]);
        });

    resources($$resources);
    langs(Object.keys($$resources));
}

export const $const = Object.defineProperties({}, {
    lang: {
        value: lang
    },
    langs: {
        value: langs
    },
    invalid: {
        value: INVALID
    },
    startTime: {
        value: START_TIME
    }
});

export const $menu: IMenu = Object.defineProperties({}, {
    top: {
        value: ko.observable(false)
    },
    func: {
        value: ko.observable(false)
    }
});

ko.use({
    install: () => {
        const $styleEL = $('<style>', {
            type: 'text/css',
            rel: 'stylesheet'
        }).appendTo(document.head);

        ko.computed({
            read: () => {
                const top = ko.toJS($menu.top)
                    , func = ko.toJS($menu.func);

                ko.tasks.schedule(() => {
                    if (top) {
                        if (func) {
                            const mtop: number = $('.navbar.fixed-top').outerHeight() || 0
                                , ftop: number = $('.function-area.fixed-top').outerHeight() || 0;

                            $styleEL.html(`nav-bar { top: 0px } .function-area.fixed-top { margin-top: ${mtop}px } .container-fluid { margin-top: ${mtop + ftop}px; min-height: calc(100vh - ${mtop + ftop}px); }`);

                        } else {
                            const mtop: number = $('.navbar.fixed-top').outerHeight() || 0;

                            $styleEL.html(`nav-bar { top: 0px } .function-area.fixed-top { margin-top: 0px } .container-fluid { margin-top: ${mtop}px; min-height: calc(100vh - ${mtop}px); }`);
                        }
                    } else if (func) {
                        const ftop: number = $('.function-area.fixed-top.fixed-top').outerHeight() || 0;

                        $styleEL.html(`nav-bar { top: 0px } .function-area.fixed-top { margin-top: 0px } .container-fluid { margin-top: ${ftop}px; min-height: calc(100vh - ${ftop}px); }`);
                    } else {
                        $styleEL.html('nav-bar { top: 0px } .function-area.fixed-top { margin-top: 0px } .container-fluid { margin-top: 0px; min-height: 100vh; }');
                    }
                });
            },
            disposeWhenNodeIsRemoved: $styleEL.get(0)
        });
    }
});