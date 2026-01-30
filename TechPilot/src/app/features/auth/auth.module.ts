import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
// import { AuthGuard } from './auth.guard';
// import { RoleGuard } from './role.guard';
// import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [AuthService, AuthGuard, RoleGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class AuthModule {}
