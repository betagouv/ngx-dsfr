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
import { MatButtonModule } from '@angular/material/button';

/**
 * 3rd-party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';

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
    DsfrLinkModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
