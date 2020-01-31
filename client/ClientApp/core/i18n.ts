import { _, $, ko } from 'core/providers';
import { handler, component } from 'core/decorators';

const lang = ko.observable('vi')
    , resource = {
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
    };

@handler({
    bindingName: 'i18n'
})
export class I18nBinding implements ko.BindingHandler {
    init(el: HTMLElement, accessor: () => ko.BindingAccessors | string) {
        ko.computed({
            read() {
                const lg = ko.toJS(lang)
                    , res = ko.toJS(accessor());

                $(el).text(_.get(resource, `${lg}.${res}`) || res);
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