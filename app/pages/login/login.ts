import { Component } from '@angular/core';
import { NavController }
  from 'ionic-angular';
import { FirebaseAuth } from 'angularfire2';
import { TodoPage } from '../todo/todo';
import { RegisterPage } from '../register/register';
import { Notifications } from '../../providers/notifications/notifications';
import { EmailPasswordCredentials } from "angularfire2/providers/auth_backend";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  credentials:EmailPasswordCredentials = {
    email: '',
    password: ''
  };

  constructor(private navController:NavController,
              private auth:FirebaseAuth,
              private notifications:Notifications) {
  }

  login(credentials:EmailPasswordCredentials) {
    this.notifications.showLoading();
    this.auth.login(credentials).then(() => {
      this.notifications.hideLoading();
    }).catch(error => {
      this.notifications.showError(error);
    })
  }

  register() {
    this.navController.setRoot(RegisterPage);
  }

}
