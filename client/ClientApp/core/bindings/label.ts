import { _, $, ko } from 'core/providers';


ko.bindingHandlers.label = {
    init: function (element: HTMLElement, valueAccessor: () => ko.Observable<string>) {
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