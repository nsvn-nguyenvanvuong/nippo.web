import { _, $, ko, moment } from 'core/providers';

import { handler } from 'core/decorators';

const FORMAT = 'YYYY-MM-DD';

@handler({
    virtual: false,
    validatable: true,
    bindingName: 'date'
})
export class DateBindingHandler implements ko.BindingHandler {
    init(element: HTMLElement, valueAccessor: () => ko.Observable<Date>, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) {
        const accessor = valueAccessor()
            , $dateElement = $(element);

        $dateElement
            .text(moment(ko.toJS(accessor)).format(FORMAT));

        if (ko.isObservable(accessor)) {
            accessor.subscribe((v: Date) => $dateElement.text(moment(v).format(FORMAT)));
        }
    }
}

@handler({
    virtual: false,
    validatable: true,
    bindingName: 'dateInput'
})
export class DateInputBindingHandler implements ko.BindingHandler {
    init(element: HTMLInputElement, valueAccessor: () => ko.Observable<Date>, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) {
        const accessor = valueAccessor()
            , $dateInput = $(element);

        $dateInput
            .on('input', () => {
                const value = $dateInput.val() as string;

                if (value.match(/\d{4}\-\d{2}\-\d{2}/)) {
                    const mdate = moment($dateInput.val(), FORMAT);

                    if (mdate.isValid()) {
                        accessor(mdate.toDate());
                    }
                }
            });

        $dateInput
            .attr('type', 'text')
            .val(moment(ko.toJS(accessor)).format(FORMAT));

        if (ko.isObservable(accessor)) {
            accessor.subscribe((v: Date) => $dateInput.val(moment(v).format(FORMAT)));
        }
    }
}