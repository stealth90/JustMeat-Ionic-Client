import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {
    if(!req.url.includes('/login')){
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getToken()
        }
      });
    }
    return next.handle(req)
      .pipe(
        tap( (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return;
          }
        }, (err: any) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        })
      );
  }
}
