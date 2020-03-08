import { _, ko } from 'core/providers';
import { component } from 'core/decorators';

@component({
    name: "login",
    url: '/login',
    title: "login",
    template: require('./index.html')
})
export class LoginViewModel extends ko.ViewModel {

    model: User = new User();
    dataSources: ko.ObservableArray<User> = ko.observableArray([] as User[]);

    public created() {
        const vm = this
            , ds: User[] = [];

        ds.push(new User({
            username: "chungnt",
            password: "123"
        }));

        vm.dataSources(ds);
    }

    login(user: User) {
        const vm = this
            , use: IUser = ko.toJS(user)
            , dataSources: IUser[] = ko.toJS(vm.dataSources) as any
            , exist = _.find(dataSources, (value: IUser) => value.username === use.username && value.password === use.password);

        if(exist) {
            console.log('Dang nhap thanh cong');
        }else{
            console.log('Dang nhap that bai');
        }
    }
}

interface IUser {
    username: String;
    password: String;
}

class User {
    username: ko.Observable<String> = ko.observable('');
    password: ko.Observable<String> = ko.observable('');

    constructor(param?: IUser) {
        if (param) {
            this.updateUser(param);
        }
    }

    public updateUser(param: IUser) {
        const model = this;
        this.username(param.username);
        this.password(param.password)
    }
}