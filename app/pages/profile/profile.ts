import { Component } from '@angular/core';
import { Platform, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable, FirebaseAuth } from 'angularfire2';
import { Camera } from 'ionic-native';
import { User } from '../../models/user';
import {LoginPage} from "../login/login";


/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {

  user: FirebaseObjectObservable<User>;
  userSnapshot: User;

  constructor(private platform:Platform,
              private navController: NavController,
              private af: AngularFire,
              private auth: FirebaseAuth,
              private actionSheetController: ActionSheetController,
              private alertController: AlertController) {
  }

  ionViewLoaded() {
    this.auth.subscribe((authData) => {
      if (authData) {
        this.user = this.af.database.object(`/users/${authData.uid}`);
        this.user.subscribe((snapshot) => this.userSnapshot = snapshot);
      } else {
        this.user = null;
      }
    })
  }

  updatePicture() {
    let actionSheet = this.actionSheetController.create({
      buttons: [{
        text: 'Upload photo',
        handler: () => {
          this.getPicture(true);
        }
      }, {
        text: 'Take photo',
        handler: () => {
          this.getPicture(false).then((base64) => {
            // save the image
          })
        }
      }]
    });
    actionSheet.present();
  }

  updateUsername() {
    let alert = this.alertController.create({
      title: 'Enter new username',
      inputs: [{
        name: 'username',
        value: this.userSnapshot.username
      }],
      buttons: [{
        text: 'Cancel',
        role: 'Cancel'
      }, {
        text: 'OK',
        handler: (data) => {
          if (data.username) {
            this.user.update({username: data.username});
          } else return false;
        }
      }]
    });
    alert.present();
  }

  private getPicture(fromGallery: boolean): Promise<any> {
    return new Promise(resolve => this.platform.ready().then(() => {
      Camera.getPicture({
        sourceType: fromGallery ? 0 : 1
      }).then(imageData => {
        resolve("data:image/jpeg;base64," + imageData);
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
    }));
  }

}
