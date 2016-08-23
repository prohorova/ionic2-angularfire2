import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TodoPage} from './pages/todo/todo';
import {LoginPage} from './pages/login/login';
import {ProfilePage} from './pages/profile/profile';
import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  FirebaseAuth,
  firebaseAuthConfig,
  FirebaseAuthState} from 'angularfire2';
import { config, authConfig} from './firebaseConfig';
import { Notifications } from './providers/notifications/notifications';
import { RegisterPage} from "./pages/register/register";

@Component({
  templateUrl: 'build/app.html',
  providers: [FIREBASE_PROVIDERS,
    defaultFirebase(config),
    AngularFire,
    firebaseAuthConfig(authConfig),
    Notifications
  ]
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;

  rootPage:any;
  enableMenu: boolean;

  constructor(platform:Platform,
              private auth:FirebaseAuth,
              private menuController:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.menuController.enable(false);

    this.auth.subscribe((authState) => {
      console.log(authState);

      if (authState) {
        this.enableMenu = true;
        this.nav.setRoot(TodoPage);
      } else {
        this.enableMenu = false;
        this.menuController.enable(false);
        this.nav.setRoot(LoginPage);
      }
    })
  }

  ngOnDestroy() {
    this.auth.unsubscribe();
  }

  goToProfilePage() {
    this.nav.push(ProfilePage);
  }

  logout() {
    this.auth.logout();
  }
}

ionicBootstrap(MyApp);
