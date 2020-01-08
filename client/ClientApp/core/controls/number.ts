import { _, $, ko } from 'core/providers';

ko.bindingHandlers.numberInput = {
    init: function (element: HTMLInputElement, valueAccessor: () => ko.Observable<number>, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) {
        const accessor = valueAccessor()
            , $numberInput = $(element);

        $numberInput
            .on('input', () => {
                const value = $numberInput.val() as string;

                if (_.size(value)) {
                    const number = Number($numberInput.val());

                    if (_.isNumber(number) && !_.isNaN(number)) {
                        accessor(number);
                    }
                }
            });

        $numberInput
            .attr('type', 'text')
            .val(ko.toJS(accessor));

        if (ko.isObservable(accessor)) {
            accessor.subscribe((v: number) => $numberInput.val(v));
        }
    }
};