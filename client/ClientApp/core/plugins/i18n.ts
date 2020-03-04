import { _, ko } from 'core/providers';
import { lang, langs, resources } from 'core/plugins/configs';
import { handler, component } from 'core/decorators';

import { storage } from 'core/storage';
import { ViewModel } from 'core/apps/viewmodel';

const LK = 'lang';

if (storage.local.hasItem(LK)) {
    lang(storage.local.getItem(LK));
}

lang.subscribe((l: string) => storage.local.setItem(LK, l));

function i18n(resources: IResource, resource: string | number, params?: string | string[] | { [key: string]: string }): string {
    const groups: { [key: string]: string } = {}
        , regex: RegExp = /{\d+}|#{[^}]+}|{#[^}]+}/g;

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
        return (resources[resource] || resource)
            .replace(regex, (match: string) => {
                const key = match.replace(/[#{}]/g, '');

                return i18n(resources, (groups[key] || key), groups);
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
                    , res = ko.toJS(accessor())
                    , $$resources = ko.toJS(resources);

                el.innerText = i18n($$resources[lg] || {}, res);
            },
            disposeWhenNodeIsRemoved: el
        });
    }
}

@component({
    name: "languages",
    template: `<div class="btn-group" data-bind="foreach: languages">
        <button class="btn" data-bind="
            i18n: $data,
            click: $vm.changeLg,
            css: { 
                'btn-primary': $vm.isChecked($data),
                'btn-secondary': !$vm.isChecked($data)
            }"></button>
    </div>`
})
export class LanguagesComponent extends ViewModel {
    languages = langs;

    public changeLg(lg: string) {
        lang(lg);
    }

    public isChecked(lg: string) {
        return ko.toJS(lang) === ko.toJS(lg);
    }
}