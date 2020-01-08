import { _, $, ko, moment } from 'core/providers';

const FORMAT = 'YYYY-MM-DD';

ko.bindingHandlers.date = {
    init: function (element: HTMLElement, valueAccessor: () => ko.Observable<Date>, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) {
        const accessor = valueAccessor()
            , $dateElement = $(element);

        $dateElement
            .text(moment(ko.toJS(accessor)).format(FORMAT));

        if (ko.isObservable(accessor)) {
            accessor.subscribe((v: Date) => $dateElement.text(moment(v).format(FORMAT)));
        }
    }
}

ko.bindingHandlers.dateInput = {
    init: function (element: HTMLInputElement, valueAccessor: () => ko.Observable<Date>, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) {
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
};