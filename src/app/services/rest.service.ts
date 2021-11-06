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

  login(mail: any,pass: any) {// hacer opcionalmente para email: string y password: string
    // para que nos devuelva una promesa, sintáxis para llamar a apirest
    return new Promise(resolve => {
        // <any>: para crearnos una interface, por ejemplo: <Usuario>
        this.http.post<any>(this.api + '/login',
        {
          email: mail,
          password: pass 
          
        }).subscribe(data => {// raul@raul.com devuelve los datos a quien llame a esta función
          this.token = data.data.token;// para guardar solamente el token
          console.log(data);
  
          resolve(data);
          
        });
    });
  }

  register(firstname: any, secondname: any, mail: any,pass: any, c_password: any, company_id: any) {// hacer opcionalmente para email: string y password: string
    // para que nos devuelva una promesa, sintáxis para llamar a apirest
    return new Promise(resolve => {
        // <any>: para crearnos una interface, por ejemplo: <Usuario>
        this.http.post<any>(this.api + '/register',
        {
          firstname: firstname,
          secondname: secondname,
          email: mail,
          password: pass,
          c_password: c_password,
          company_id: company_id
          
        }).subscribe(data => {// raul@raul.com devuelve los datos a quien llame a esta función
          this.token = data.data.token;// para guardar solamente el token
          console.log(data);
  
          resolve(data);
          
        });
    });
  }

  async obtenerUsuarios(token) {

    return new Promise(resolve => {
 
      this.http.get(this.api + '/users', {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+token)
      }).subscribe(data => {
        this.token = data;
        resolve(data);
        console.log(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  activar(token)
  {
    return new Promise(resolve => {
      this.http.post(this.api + '/activate',
      {
        //pasar datos por parametros
        'user_id':'6'
      }, 
      {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+token)
      }).subscribe(data => {
        console.log(data)
        resolve(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  desactivar(token)
  {
    return new Promise(resolve => {
      this.http.post(this.api + '/deactivate',
      {
        'user_id':'6'
      }, 
      {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+token)
      }).subscribe(data => {
        console.log(data)
        resolve(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }
}
