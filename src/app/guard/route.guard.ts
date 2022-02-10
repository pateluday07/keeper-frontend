import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from '../enum/message';
import { RoutePath } from '../enum/route-path';
import { NoteService } from '../service/note.service';
import { ToastService } from '../toast/toast-service';
import * as fromRoot from '../store/selectors/route-to-update-comp.selectors';
import { routeToUpdateCompFalse } from '../store/actions/route-to-update-comp.actions';
import { select, Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private noteService: NoteService, private toastService: ToastService, private router: Router,
    private store: Store<fromRoot.AppState>) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("before");
    this.name(route);
    console.log("after");
    return true;
  }

  async name(route: ActivatedRouteSnapshot): Promise<boolean> {

    await this.store.pipe(select(fromRoot.selectFeatureRouteToUpdateComp))
      .subscribe(
        (success) => {
          if (success) {
            return success;
          } else {
            let id = route.params.id;
            return this.noteService.isExistsById(id)
              .then(result => {
                if (!result) {
                  this.toastService.showErrorToast(Message.NoteNotFound + id);
                  this.router.navigate([RoutePath.Home]);
                }
                return result;
              })
              .catch(error => { return false; });
          }
        },
        (error) => { return false; });

    return false;
  }

}
