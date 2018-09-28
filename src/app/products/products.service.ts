import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/Http';
import { AuthService} from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getProducts(){
    var token=this._authService.checkUserStats();
    return this._http.get('http://localhost:3000/getproducts');
    }
}
