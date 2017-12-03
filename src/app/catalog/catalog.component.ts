import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  items: Array<any>;
  userLogged: boolean = false;
  // Create an instance of the DataService through dependency injection
  constructor(private mainService: MainService) {

    // Access the Data Service's getUsers() method we defined
    this.mainService.getAllItems()
      .subscribe(res => this.items = res);
    }
   
    deleteItem(itemId){
      this.mainService.deleteItem(itemId);
      for(let i=0; i<this.items.length; i++){
            if(this.items[i]._id == itemId){
              this.items.splice(i,1);
            }
      }
    }
   

  ngOnInit() {
    if(localStorage.getItem('userLogged')){
      this.userLogged = true;
    }
    else {
      this.userLogged = false;
    }
  }

}
