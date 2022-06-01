import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { UserAuthService } from "../shared/services/user-auth.service";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements  HttpInterceptor{
    constructor(private userAuthService:UserAuthService, private router:Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     //throw new Error("Method not implemented.");
        console.log("request====>",req);
        const token  = this.userAuthService.getToken();
        console.log("token====>",token);
        let jwtToken = req.clone({headers:req.headers.set('Authorization',token).set('Content-Type', 'application/json').
        set('X-Requested-With','XMLHttpRequest')})

       return next.handle(jwtToken)
        req = this.addToken(req, token);


        // return next.handle(req).pipe(
        //     catchError(
        //         (err:HttpErrorResponse) => {
        //              console.log(err);
        //              if(err.status === 401)
        //              this.router.navigate(['/login'])
        //              return throwError("Some thing is wrong")
        //         }
        //     )
        // )
    }

    private addToken(request:HttpRequest<any>,token:string){
        return request.clone(
            {
                headers:request.headers.set('Authorization',token).set('Content-Type', 'application/json').
                set('X-Requested-With','XMLHttpRequest')
            }
        )

    }


    
}

export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}