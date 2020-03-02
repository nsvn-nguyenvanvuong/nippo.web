import { $ } from 'core/providers';
import { component } from 'core/decorators';
import { ViewModel } from 'core/apps/viewmodel';

@component({
    name: "nav-bar",
    template: require("./index.html")
})
export class NarBarViewModel extends ViewModel {
    private subscribe!: ko.Subscription;

    public created() {
        const vm = this;

        vm.subscribe = vm.$menu.top
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
            });
    }

    public mounted() {
        const vm = this;

        vm.$menu.top(true);
    }

    public destroyed() {
        const vm = this;

        vm.$menu.top(false);

        vm.subscribe.dispose();
    }
}