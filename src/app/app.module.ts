import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TetrisgridComponent } from './tetrisgrid/tetrisgrid.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisgridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
