import { _, $, ko } from 'core/providers';

ko.bindingHandlers.passwordInput = {
    init: function (element: HTMLInputElement, valueAccessor: () => ko.Observable<string>, allBindings: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) {
        const accessor = valueAccessor()
            , $passwordInput = $(element);

        $passwordInput
            .on('input', () => {
                const value = $passwordInput.val() as string;

                accessor(value);
            });

        $passwordInput
            .attr('type', 'text')
            .val(ko.toJS(accessor));

        if (ko.isObservable(accessor)) {
            accessor.subscribe((v: string) => $passwordInput.val(v));
        }
    }
};