import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ToastsContainer } from './toast/toast-container.component';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { routeToUpdateCompReducer } from './store/reducers/route-to-update-comp.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
    ToastsContainer,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ isRouteToUpdateCompState: routeToUpdateCompReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
