import {
    Observable as _Observable,
    ObservableArray as _ObservableArray
} from 'knockout';

declare global {
    interface Observable<T> extends _Observable<T> {
    }

    interface ObservableArray<T = any> extends _ObservableArray<T> {
    }

    interface IComponent {
        url?: string;
        name: string;
        template: string;
    }

    interface IRoute {
        url: string;
        name: string;
    }

    interface IParams {
        [key: string]: any;
    }

    interface IRouter extends Observable<string> {
        params: IParams;
        goto: (nameOrUrl: string, params?: IParams) => void;
        register: (name: string, url: string) => void;
        set: (home?: string, notFound?: string) => void;
    }
}