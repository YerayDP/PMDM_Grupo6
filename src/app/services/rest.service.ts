import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  api = environment.apiUrl;
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNzA2MTZkODQxMDVjMTMwZjNhNzQxMGJjY2IyOTA0MjlhNDBhNzIwZjVhMzI0NWRlYzgxNzZjYmE4Yjc0YjhlMWQ1NjNiMjAwOTgwZjBmZmYiLCJpYXQiOjE2MzU5NTk5ODYsIm5iZiI6MTYzNTk1OTk4NiwiZXhwIjoxNjY3NDk1OTg2LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.doLzTVQhjE3U0mlnlpf31cxcgHWf2C0S5vfg_O0ZlhjX6a1kcn1BokbAHQNliC5QnkK1XMMcf2iU1bkG2T-HY7fHTV2klY2kd--umAAQk0BdbsXXmV0hVdPDE_IV2VCOa5aTVXdq-2mXbGCoE5CJtu95ziKwiVBnBf45om_X0DiFIyz5DCfItQsZxXNoTVRTg3_jPVj2M7JoFgX86z2vdjBdhj4om-EBtkQqN2NBHYHRz4IlDJty5vpK4Hlr7S98ol7h9PeNwBQQnzHzb3nAU0z0WgcVlqasZu06Od6bA65F4VJ9WrDQZyPluC2CV5P4t7gaYHxUDUYCnGUhcGVuUQme7lTjed3GhZnI3Utn7_82bRFT-rtnRY6vf6Br_qNVatngJaeDeVsa_-WW0slsdCU2uBhoLJfqBsHqezsETMG_zxuANZk_J67fKWzpggPrCDxtSzy-nqoMjTkhIYhwXFZP4tRLiVROhWPFlMwkis1HlMfACNRfzoklmZ1M-bpbQc2Ky0GwCffmjEU60eLTeDlRtu0atuLTMnyqBmTUpWnVrKezlW95HH6ylwEBtjjwXbUocTvWwafcIfLnAVj5yim0Ac6Ub4p4MLhomrWYOKdD2OuWuOgFDNTzdvJoOYyTg4-Iakbzow4XxLSaGxS5Q3U1aFHX3xZBL_MI63o0ZFE';//any: para especificar una variable de cualquier tipo

  constructor(private http: HttpClient) { }

  login(mail: any,pass: any) {// hacer opcionalmente para email: string y password: string
    // para que nos devuelva una promesa, sintáxis para llamar a apirest
    return new Promise(resolve => {
        // <any>: para crearnos una interface, por ejemplo: <Usuario>
        this.http.post<any>(this.api + '/login',
        {
          email: mail,
          password: pass 
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
