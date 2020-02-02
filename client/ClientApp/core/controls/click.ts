import { ko } from 'core/providers';
import { handler } from 'core/decorators';

const originalClick = ko.bindingHandlers.click;

// override click binding with timeClick (default: 500)
@handler({
    virtual: false,
    validatable: true,
    bindingName: 'click'
})
export class SafeClickBindingHandler implements ko.BindingHandler {
    init = (element: HTMLElement, valueAccessor: () => Function, allBindingsAccessor: ko.AllBindings, viewModel: any, bindingContext: ko.BindingContext) => {
        let lastPreventTime: number = new Date().getTime();

        const originalFunction = valueAccessor()
            , newValueAccesssor = function newAccessor() {
                return function newClickHandler() {
                    const currentPreventTime: number = new Date().getTime()
                        , time: number = currentPreventTime - lastPreventTime
                        , timeClick: number | undefined = allBindingsAccessor.get('timeClick')
                        , $timeClick: number = typeof timeClick === 'number' && !isNaN(time) ? timeClick : 0;

                    if (time > $timeClick) {
                        //pass through the arguments
                        originalFunction.apply(viewModel, arguments);
                    }

                    lastPreventTime = new Date().getTime();
                }
            };

        // call originalClick init
        originalClick.init(element, newValueAccesssor, allBindingsAccessor, viewModel, bindingContext);
    }
}