import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import routeConfig from './routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routeConfig),
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
