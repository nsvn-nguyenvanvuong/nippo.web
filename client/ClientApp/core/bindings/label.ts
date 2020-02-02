import { _, $, ko } from 'core/providers';

import { handler } from 'core/decorators';

@handler({
    virtual: false,
    validatable: true,
    bindingName: 'label'
})
export class LabelBindingHandler implements ko.BindingHandler {
    init(element: HTMLElement, valueAccessor: () => ko.Observable<string>) {
        const accessor = valueAccessor()
            , $labelElement = $(element);

        $labelElement
            .text(ko.toJS(accessor))
            .addClass('control-label mb-1');

        if (ko.isObservable(accessor)) {
            accessor.subscribe((v: string) => $labelElement.text(ko.toJS(v)));
        }
    }
}