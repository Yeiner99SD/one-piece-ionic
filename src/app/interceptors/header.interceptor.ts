import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let language = localStorage.getItem('language') as string;
    
    // Crear nuevo objeto de headers
    const modifiedReq = req.clone({
      setHeaders: {
        'x-rapidapi-host': 'one-piece-episodes.p.rapidapi.com',
        'x-rapidapi-key': 'e77e313b52msh170c083ea092646p1e4650jsn55df2d57295f'
      },
      params: req.params.append('language', language)
    });
  
    console.log('Interceptando petición:', modifiedReq); // Para verificar en la consola
    return next.handle(modifiedReq);
  }
}