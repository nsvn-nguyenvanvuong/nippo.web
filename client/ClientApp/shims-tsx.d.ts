import {
    Observable as _Observable,
    ObservableArray as _ObservableArray
} from 'knockout';

declare global {
    interface Observable<T> extends _Observable<T> {
    }

    interface ObservableArray<T = any> extends _ObservableArray<T> {
    }
}