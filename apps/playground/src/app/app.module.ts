/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**
 * 3rd-party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';

/**
 * Internal imports
 */
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, DsfrLinkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
