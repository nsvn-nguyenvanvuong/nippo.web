import { $, ko } from 'core/providers';
import { component } from 'core/decorators';

@component({
    name: "nav-bar",
    template: require("./index.html")
})
export class NarBarViewModel extends ko.ViewModel {
    public created() {
        const vm = this;

        vm.$menu.top
            .subscribe(top => {
                if (!top) {
                    $(vm.$el)
                        .addClass('d-none')
                        .removeClass('d-block');
                } else {
                    $(vm.$el)
                        .addClass('d-block')
                        .removeClass('d-none');
                }
            }).disposeWhenNodeIsRemoved(vm.$el);
    }

    public mounted() {
        const vm = this;

        vm.$menu.top(true);
    }

    public destroyed() {
        const vm = this;

        vm.$menu.top(false);
    }
}