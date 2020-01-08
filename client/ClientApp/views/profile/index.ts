import { View, ViewModel, Param } from 'core/providers';

@View({
    name: "profile",
    route: "/profile/{username}",
    title: "Profile",
    template: require("./index.html").default
})
export class ProfileViewModel extends ViewModel {
    @Param()
    username: string = '';
}