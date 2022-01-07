import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ToastsContainer } from './toast/toast-container.component';
import { AutoFocusDirective } from './directive/auto-focus.directive';

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
