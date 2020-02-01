import { ko } from 'core/providers';

export function handler(params: IBindingOption) {
    return function (constructor: BindingConstructor) {
        ko.bindingHandlers[params.bindingName] = new constructor();
        ko.virtualElements.allowedBindings[params.bindingName] = !!params.virtual;

        // block rewrite binding
        if (params.validatable) {
            ko.utils.extend(ko.expressionRewriting.bindingRewriteValidators, { [params.bindingName]: false });
        }
    }
}