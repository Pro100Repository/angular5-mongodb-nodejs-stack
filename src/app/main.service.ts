import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MainService {

  result:Observable<any>;

  constructor(private _http: Http) { }

  getAllItems() {
    return this._http.get("/api/items")
      .map(result => this.result = result.json().data);
  }
  
  checkUser(data){
    return this._http.post("/api/check", data)
    .map(result => this.result = result.json().data);
  }

  deleteItem(itemId){
    console.log(itemId)
      this._http.delete("/api/items/" + itemId).subscribe((err) =>{
        console.log(err)
      })
  }
}
