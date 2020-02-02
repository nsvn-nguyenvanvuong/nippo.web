import { ko } from 'core/providers';

ko.extenders.logChange = function (target, option) {
    target.subscribe(function (newValue: any) {
        console.log(option + ": " + newValue);
    });
    return target;
};