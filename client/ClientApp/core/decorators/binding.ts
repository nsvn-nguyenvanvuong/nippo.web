import { ko } from 'core/providers';

export function handler(params: IBindingParams) {
    return function (constructor: BindingConstructor) {
        // merge resources
        // ko.utils.merge(i18n, params.resources);

        ko.bindingHandlers[params.bindingName] = new constructor();
        ko.virtualElements.allowedBindings[params.bindingName] = !!params.virtual;

        // block rewrite binding
        if (params.validatable) {
            ko.utils.extend(ko.expressionRewriting.bindingRewriteValidators, { [params.bindingName]: false });
        }
    }
}