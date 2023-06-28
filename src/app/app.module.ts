import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RoundedBlockDirective } from './directives/rounded-block.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/ES';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    RoundedBlockDirective,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
