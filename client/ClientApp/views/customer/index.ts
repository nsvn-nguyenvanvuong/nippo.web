import { _, ko } from 'core/providers';
import { component } from 'core/decorators';

@component({
    name: "customer",
    url: '/customer',
    title: "customer",
    template: require('./index.html')
})
export class CustomerViewModel extends ko.ViewModel {
    model: Customer = new Customer();
    dataSources: ko.ObservableArray<Customer> = ko.observableArray([] as Customer[]);

    public created() {
        const vm = this
            , ds: Customer[] = [];

        for (let i = 0; i <= 9; i++) {
            ds.push(new Customer({
                id: i,
                age: 24,
                gender: i % 2 === 0 ? 'male' : 'female',
                name: 'Nguyen Van ' + i,
                address: 'Address ' + i
            }));
        }

        vm.dataSources(ds);

        vm.model.id.subscribe(id => {
            console.log("subscribe: " + id);

            if (id === -1) {
                vm.model.updateInfo({
                    id,
                    address: '',
                    age: -1,
                    gender: 'unknow',
                    name: ''
                });
            } else {
                const dataSources: ICustomer[] = ko.toJS(vm.dataSources) as any
                    , exist = _.find(dataSources, (cs) => cs.id === id);

                if (exist) {
                    vm.model.updateInfo(exist);
                }
            }
        });

        ko.computed({
            read: () => {
                const id = ko.toJS(vm.model.id);

                console.log("computed: " + id);
            }
        });
    }

    public selectCustomer(cus: Customer) {
        const vm = this
            , customer: ICustomer = ko.toJS(cus);

        vm.model.id(customer.id);
        // update all info
        // vm.model.updateInfo(customer);
    }
}

type GENDER = 'male' | 'female' | 'unknow';

interface ICustomer {
    id: number;
    name: string;
    age: number;
    gender: GENDER;
    address?: string;
}

class Customer {
    id: ko.Observable<number> = ko.observable(-1);
    name: ko.Observable<string> = ko.observable('');
    age: ko.Observable<number> = ko.observable(-1);
    gender: ko.Observable<GENDER> = ko.observable('unknow');
    address: ko.Observable<string> = ko.observable('');

    constructor(params?: ICustomer) {
        const model = this;

        if (params) {
            model.id(params.id);

            model.updateInfo(params);
        }
    }

    public updateInfo(params: ICustomer) {
        const model = this;

        model.name(params.name);
        model.gender(params.gender);
        model.age(params.age);
        model.address(params.address || '');
    }
}