import { ko } from 'core/providers';

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
        value: ko.computed(() => ko.toJS(lang))
    },
    langs: {
        value: ko.computed(() => ko.toJS(langs))
    },
    invalid: {
        value: INVALID
    },
    startTime: {
        value: START_TIME
    }
});