import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  api = environment.apiUrl;
  id:any;
  token: any;//any: para especificar una variable de cualquier tipo
  token2: any;
  userLogged: any;
  currentUser: any;
  checkActived: any;
  checkConfirmed: any;
  company_id: any;
  articulosS: any;
  numProductos: any;
  productosS: any;
  familias: any;
  company : any;
  listCompanies: any;



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
          this.userLogged = data.data.type;
          this.checkActived = data.data.actived;
          this.company_id = data.data.company_id;
          this.company = data.data.company;
          this.token = data.data.token;// para guardar solamente el token
          console.log(data);
          this.user();
          resolve(this.token);
          this.obtenerArticulos(this.token);
          this.obtenerDatosF();
          this.companies();
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
        this.token2 = data;
        resolve(data);
        console.log(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  activar(token,id:any)
  {
    console.log(token)
    return new Promise(resolve => {
      this.http.post(this.api + '/activate',
      {
        //pasar datos por parametros
        'user_id':id
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

  desactivar(token,id:any)
  {
    return new Promise(resolve => {
      this.http.post(this.api + '/deactivate',
      {
        'user_id':id
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

  eliminar(token,id:any)
  {
    return new Promise(resolve => {
      this.http.post(this.api + '/user/deleted/'+id,
      {
        'user_id' : id
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

  editar(token,id:any, firstname:any, secondname:any, email:any, password:any, company_id:any)
  {
    return new Promise(resolve => {
      this.http.post(this.api + '/user/updated/'+id,
      {
        'user_id': id,
        'firstname':firstname,
        'secondname':secondname,
        'email':email,
        'password':password,
        'company_id':company_id
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

  companies()
  {
    return new Promise(resolve => {
      this.http.get(this.api + '/companies',
      ).subscribe(data => {
        this.listCompanies=data;
        console.log(data)
        resolve(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
      
  }

  user()
  {
    return new Promise(resolve => {
      this.http.get(this.api + '/user/'+170,
      {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        this.currentUser = data;
        console.log(data);
        resolve(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  async obtenerProductos(company_id:any): Promise<any>
  {
    return new Promise(resolve => {
 
      this.http.post(this.api + '/products/company',
      {
        id: company_id
      },
      {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        resolve(data); 
        this.productosS=data
        //console.log(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  eliminarProducto(token,id:any)
  {
    return new Promise(resolve => {
      this.http.delete(this.api + '/products/'+id,
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

  añadirProducto(article_id:any, company_id:any, price:any, family_id:any)
  {
    return new Promise(resolve => {
      this.http.post(this.api + '/products',
      {
        article_id : article_id,
        company_id: company_id,
        price: price,
        family_id: family_id
      },
      {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        console.log(data)
        resolve(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  obtenerArticulos(token)
  {
    return new Promise(resolve => {
 
      this.http.get(this.api + '/articles', {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+token)
      }).subscribe(data => {
        resolve(data);
        this.articulosS=data;
        //console.log(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  obtenerPedidos()
  {
    return new Promise(resolve => {
 
      this.http.get(this.api + '/orders', {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        resolve(data);
        console.log(data)
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  obtenerDatosArt(id:any)
  {
    return new Promise(resolve => {
      this.http.post(this.api + '/mostrarArt/'+id,
      {
        id : id,
      },
      {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        console.log(data)
        resolve(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  obtenerDatosF()
  {
    return new Promise(resolve => {
 
      this.http.get(this.api + '/families'
      ).subscribe(data => {
        this.familias=data;
        resolve(data);
        console.log(data)
      }, err => {
        console.log('Error, '+err);
      });
    });
  }

  añadirPedido(num:any, issue_date:any, origin_company_id:any, target_company_id:any, products:any)
  {
    return new Promise(resolve => {
      this.http.post(this.api + '/orders',
      {
        num : num,
        issue_date: issue_date,
        origin_company_id: origin_company_id,
        target_company_id: target_company_id,
        products: products
      },
      {
        // para crearnos la cabecera
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }).subscribe(data => {
        console.log(data)
        resolve(data);
      }, err => {
        console.log('Error, '+err);
      });
    });
  }
  
}
