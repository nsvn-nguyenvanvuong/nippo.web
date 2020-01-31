import { $ } from 'core/providers';
import { router } from 'core/apps/route';

export abstract class ViewModel {
    public readonly fetch: IFetch = $.ajax;
    public readonly router: IGoto = router.goto;
}