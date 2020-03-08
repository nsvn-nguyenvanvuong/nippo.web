import { _, ko } from 'core/providers';
import { component } from 'core/decorators';

@component({
    name: "search",
    url: '/search',
    title: "search",
    template: require('./index.html')
})
export class SearchViewModel extends ko.ViewModel {

    model: Product = new Product();
    dataSources: ko.ObservableArray<Product> = ko.observableArray([] as Product[]);
    param: ko.Observable<string> = ko.observable('');

    created() {
        const vm = this;

        vm.param.subscribe((v) => {
            if (!v) {
                vm.dataSources(vm.fakeDatasource());
            }
        });

        vm.param.valueHasMutated();
    }

    search() {
        const vm = this
            , keyword = ko.toJS(vm.param)
            , dataSources: IProduct[] = ko.toJS(vm.dataSources) as any
            , results = _.filter(dataSources, (value: IProduct) => value.name.indexOf(keyword) > -1);

        vm.dataSources(results.map((pr) => new Product(pr)));
    }

    fakeDatasource() {
        const ds: Product[] = [];

        for (let i = 1; i <= 10; i++) {
            ds.push(new Product({
                id: i,
                name: "ChungNT " + i,
                amount: i * i,
            }));
        }

        return ds;
    }

}

interface IProduct {
    id: number;
    name: String;
    amount: number;
}

class Product {
    id: ko.Observable<Number> = ko.observable(-1);
    name: ko.Observable<String> = ko.observable("");
    amount: ko.Observable<Number> = ko.observable(0);

    constructor(param?: IProduct) {
        if (param) {
            const model = this;
            model.id(param.id);
            this.update(param);
        }
    }

    update(param: IProduct) {
        const model = this;
        model.name(param.name);
        model.amount(param.amount);
    }
}