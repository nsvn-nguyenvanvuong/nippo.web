import { _, $, ko } from 'core/providers';
import { handler, component } from 'core/decorators';

const lang = ko.observable('vi')
    , resources: { [lg: string]: { [key: string]: string } } = {
        vi: {
            'vi': 'Tiếng Việt',
            'en': 'English',
            'abc': 'Xin chaof',
            'profile': 'Hồ sơ',
            'home': 'Trang chủ'
        },
        en: {
            'vi': 'Tiếng Việt',
            'en': 'English',
            'abc': 'hello',
            'profile': 'Profile',
            'home': 'Home'
        }
    }
    , getText = (lg: string, resource: string | number, params?: string | string[] | { [key: string]: string }): string => {
        const groups: { [key: string]: string } = {}
            , regex: RegExp = /{\d+}|#{[^}]+}|{#[^}]+}/g
            , i18lang: { [key: string]: string } = resources[lg];

        // accept numbet raw
        resource = (resource || '').toString();

        if (!_.isNull(params)) {
            if (_.isNumber(params)) {
                params = params.toString();
            }

            if (!_.isString(params)) {
                _.extend(groups, params);
            } else {
                _.extend(groups, { 0: params.toString() });
            }
        }

        if (!_.isNil(resource)) {
            return (i18lang[resource] || resource)
                .replace(regex, (match: string) => {
                    const key = match.replace(/[#{}]/g, '');

                    return getText(lg, (groups[key] || key), groups);
                }) || resource;
        }

        return '';
    };

@handler({
    bindingName: 'i18n'
})
export class I18nBinding implements ko.BindingHandler {
    init(el: HTMLElement, accessor: () => ko.Observable<string> | string) {
        ko.computed({
            read() {
                const lg = ko.toJS(lang)
                    , res = ko.toJS(accessor());

                $(el).text(getText(lg, res));
            },
            disposeWhenNodeIsRemoved: el
        });
    }
}

@component({
    name: "languages",
    template: `<div class="btn-group" data-bind="foreach: languages"><button class="btn" data-bind="click: $parent.changeLg($data), i18n: $data, css: { 'btn-primary': $parent.isChecked($data), 'btn-secondary': !$parent.isChecked($data) }"></button></div>`
})
export class LanguagesComponent {
    lg = lang;

    languages = ko.observableArray(['vi', 'en']);

    public changeLg(lg: string) {
        this.lg(lg);
    }

    public isChecked(lg: string) {
        return ko.toJS(this.lg) === ko.toJS(lg);
    }
}