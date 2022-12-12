/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

/**
 * 3rd-party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrButtonModule } from '@betagouv/ngx-dsfr/button';
import { DsfrBadgeModule } from '@betagouv/ngx-dsfr/badge';
import { DsfrRadioModule } from '@betagouv/ngx-dsfr/radio';

/**
 * Internal imports
 */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    DsfrLinkModule,
    DsfrBadgeModule,
    DsfrButtonModule,
    DsfrRadioModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
