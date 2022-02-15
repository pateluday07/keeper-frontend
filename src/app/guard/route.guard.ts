import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { NoteService } from '../service/note.service';
import { ToastService } from '../toast/toast-service';
import * as fromRoot from '../store/selectors/route-to-update-comp.selectors';
import { select, Store } from '@ngrx/store';
import { Message } from '../enum/message';
import { RoutePath } from '../enum/route-path';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private noteService: NoteService, private toastService: ToastService, private router: Router,
    private store: Store<fromRoot.AppState>) { }

  async canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean> {
    return await this.isRouteToUpdateCompAllowed(route);
  }

  async isRouteToUpdateCompAllowed(route: ActivatedRouteSnapshot): Promise<boolean> {

    let result = false;
    await this.store.pipe(select(fromRoot.selectFeatureRouteToUpdateComp))
      .subscribe(
        (response) => { result = response; },
        () => { result = false; });

    if (result)
      return result;

    let noteId = route.params.id;
    await this.noteService.isExistsById(noteId)
      .then(() => { result = true; })
      .catch(() => {
        this.toastService.showErrorToast(Message.NoteNotFound + noteId);
        this.router.navigate([RoutePath.Home]);
      });

    return result;
  }

}
