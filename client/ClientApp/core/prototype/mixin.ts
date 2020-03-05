import { ko } from 'core/providers';

Object.defineProperty(ko, 'mixin', {
    value: function mixin(mixed: IMixinOption) {
        (ko.mixin as any)['__mixeds'].push(mixed);
    }
});

Object.defineProperty(ko.mixin, '__mixeds', { value: [] });