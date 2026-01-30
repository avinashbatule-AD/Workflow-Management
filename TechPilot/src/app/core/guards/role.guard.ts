import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class RoleGuard implements CanActivate{
    constructor(private authservice:AuthService, private router:Router){}
    canActivate(route:ActivatedRouteSnapshot):boolean {
        const expectedRoles=route.data['roles']as string[];{
            if (!expectedRoles.includes(this.authservice.getRole())){
                return false
            }
            return true
        }
    }
}