import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFire, FirebaseAuth, FirebaseObjectObservable } from 'angularfire2';
import { EmailPasswordCredentials } from "angularfire2/providers/auth_backend";
import { Notifications } from '../../providers/notifications/notifications';
import { TodoPage } from "../todo/todo";
import { RegisterCredentials } from '../../models/registerCredentials';
/*
 Generated class for the RegisterPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

@Component({
  templateUrl: 'build/pages/register/register.html',
})
export class RegisterPage {
  credentials:RegisterCredentials = {
    username: '',
    email: '',
    password: ''
  };
  user:FirebaseObjectObservable<any>;

  constructor(private navController:NavController,
              private af:AngularFire,
              private auth:FirebaseAuth,
              private notifications:Notifications) {
  }

  login() {
    this.navController.setRoot(LoginPage);
  }

  register(credentials:RegisterCredentials) {
    let emailAndPasswordCredentials = {
      email: credentials.email,
      password: credentials.password
    };
    this.auth.createUser(emailAndPasswordCredentials).then((authData) => {
      this.notifications.hideLoading().then(() => {
        this.user = this.af.database.object(`/users/${authData.uid}`);
        this.user.set({username: credentials.username});
        this.auth.login(emailAndPasswordCredentials)
          .catch(error => {
            this.notifications.showError(error);
          })
      });
    }).catch(error => {
      this.notifications.showError(error);
    })
  }


}
