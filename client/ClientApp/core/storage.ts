import { _ } from 'core/providers';

const prefix: string = 'com.nippo';

class Cookie {
    private static get expired() {
        return 'Expired; expires=Mon, 01 Jan 1900 00:00:00 GMT; path=/';
    }

    private static get items(): { [key: string]: string } {
        return _.chain(document.cookie.split(';'))
            .map((value: string) => ({
                name: value.slice(0, value.indexOf('=')).trim(),
                value: value.slice(value.indexOf('=') + 1).trim()
            }))
            .keyBy('name')
            .mapValues('value')
            .value();
    }

    public static hasItem(name: string): boolean {
        return !!Cookie.items[`${prefix}.${name}`];
    }

    public static getItem(name: string): string | undefined {
        return Cookie.items[`${prefix}.${name}`];
    }

    public static setItem(name: string, value: string): void {
        document.cookie = `${`${prefix}.${name}`}=${value}; path=/`;
    }

    public static removeItem(name: string): void {
        document.cookie = `${`${prefix}.${name}`}=${Cookie.expired}`;
    }
}

// tslint:disable-next-line:max-classes-per-file
class HStorage {
    constructor(private $storage: Storage) { }

    public hasItem(name: string): boolean {
        return !!this.$storage.getItem(`${prefix}.${name}`);
    }

    public getItem(name: string): any | null {
        let value: string | null = atob(this.$storage.getItem(`${prefix}.${name}`) || '');

        try {
            if (value) {
                value = value.split('-').map((s: string) => String.fromCharCode(Number(s))).join('');

                if (value.match(/^(\{.+\}|(\[.+\]))$/)) {
                    return JSON.parse(value);
                } else if (value.match(/^-?\d*(\.\d+)?$/)) {
                    return Number(value);
                } else if (value.match(/(true|false)/)) {
                    return value === 'true';
                } else if (value.match(/^\"\d{4}.+Z\"$/)) {
                    return new Date(value.replace(/^"|"$/g, ''));
                }
            }

            return value;
        } catch {
            return value;
        }
    }
    public setItem(name: string, value: any) {
        const str: string = typeof value === 'string' ? value : JSON.stringify(value);

        this.$storage.setItem(`${prefix}.${name}`, btoa(_.map(str, (s: string) => s.charCodeAt(0)).join('-')));
    }

    public removeItem(name: string) {
        this.$storage.removeItem(`${prefix}.${name}`);
    }
}

export const storage = {
    cookie: Cookie,
    local: new HStorage(localStorage),
    session: new HStorage(sessionStorage)
};
