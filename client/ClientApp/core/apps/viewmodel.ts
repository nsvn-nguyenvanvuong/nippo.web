import { $ } from 'core/providers';
import { router } from 'core/apps/route';

import { $const } from 'core/plugins/configs';

const d = document
    , c = d.createElement;

export abstract class ViewModel {
    public readonly fetch: IFetch = $.ajax;
    public readonly router: IGoto = router.goto;

    public readonly $el: HTMLElement = c.apply(d, ['div']);

    public readonly $const: IConfigs = $const;
}