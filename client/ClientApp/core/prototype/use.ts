import { ko } from 'core/providers';

const listHash: number[] = [];

Object.defineProperty(ko, 'use', {
    value: function use(option: IUseOption) {
        const $hash = `${option}`
            .split('')
            .reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);

        if (listHash.indexOf($hash) === -1) {
            listHash.push($hash);

            // install at here
            option.install.apply(ko, []);
        }
    }
});