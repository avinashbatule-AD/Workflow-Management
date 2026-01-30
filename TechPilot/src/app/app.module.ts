import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Core & Shared Modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Dashboard Feature
import { WorkflowsModule } from './features/workflows/workflows.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AuthModule } from './features/auth/auth.module';

// Charts
// import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    DashboardModule,
    WorkflowsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // NgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true  // Ensure multiple interceptors can be used together
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
