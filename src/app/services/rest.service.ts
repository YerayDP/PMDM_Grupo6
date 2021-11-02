import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  api = environment.apiUrl;
  token: any;//any: para especificar una variable de cualquier tipo

  constructor(private http: HttpClient) { }

  login() {// hacer opcionalmente para email: string y password: string
    // para que nos devuelva una promesa, sintáxis para llamar a apirest
    return new Promise(resolve => {
        // <any>: para crearnos una interface, por ejemplo: <Usuario>
        this.http.post<any>(this.api + '/login',
        {
          email: 'raul@raul.com',
          password: '123456' 
        }).subscribe(data => {// devuelve los datos a quien llame a esta función
          this.token = data;// para guardar solamente el token
          console.log(data);
          resolve(data);
        });
    });
  }

  obtenerUsuarios(tok: any) {
    return new Promise(resolve => {
      this.http.get(this.api + '/users', {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+tok.data.token)
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }
}
