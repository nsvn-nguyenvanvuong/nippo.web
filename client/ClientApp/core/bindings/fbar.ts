import { _, $, ko } from 'core/providers';

import { handler } from 'core/decorators';

import { $menu } from 'core/plugins/configs';

@handler({
    virtual: false,
    validatable: true,
    bindingName: 'fbar'
})
export class FuncBarBindingHandler implements ko.BindingHandler {
    init(element: HTMLElement, valueAccessor: () => ko.Observable<boolean>, __: ko.AllBindings, viewModel: IViewModel) {
        const $funcbar = $(element)
            , showFbar = ko.toJS(valueAccessor())
            , subscribe = $menu.func.subscribe(func => {
                if (!document.contains(element)) {
                    subscribe.dispose();
                } else {
                    if (!func) {
                        $(element)
                            .addClass('d-none')
                            .removeClass('d-block');
                    } else {
                        $(element)
                            .addClass('d-block')
                            .removeClass('d-none');
                    }
                }
            });

        if (viewModel.$window.mode() === 'modal') {
            $funcbar.addClass('modal-header d-block px-3 py-1 bg-white border-bottom shadow-sm')
        } else {
            $menu.func(showFbar);

            $menu.func.valueHasMutated();

            $funcbar.addClass('function-area d-block px-3 py-1 bg-white border-bottom fixed-top shadow-sm');
        }
    }
}