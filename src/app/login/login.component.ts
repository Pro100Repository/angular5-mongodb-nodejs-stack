import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private auth:any = {};
  userLogged:boolean = false;
  error:string;
  constructor(private mainService: MainService) {}
  
  checkUser(auth){
    this.mainService.checkUser(auth)
    .subscribe(res => {
      if(res){
        this.userLogged = true;
        localStorage.setItem('userLogged','logged')
      }
      else{
        this.error = 'Wrong login or password';
      }
    });
  }

  signOut(){
   localStorage.clear();
   this.userLogged = false;
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
