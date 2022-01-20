import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from '../enum/message';
import { RoutePath } from '../enum/route-path';
import { NoteService } from '../service/note.service';
import { ToastService } from '../toast/toast-service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private noteService: NoteService, private toastService: ToastService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let id = route.params.id;
    return this.noteService.isExistsById(id)
      .then(result => {
        if (!result) {
          this.toastService.showErrorToast(Message.NoteNotFound + id);
          this.router.navigate([RoutePath.Home]);
        }
        return result;
      });
  }

}
