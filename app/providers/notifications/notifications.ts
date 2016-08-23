import { Injectable } from '@angular/core';
import { AlertController, Loading, LoadingController } from 'ionic-angular';


/*
  Generated class for the Notifications provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Notifications {
  loading: Loading;

  constructor(private alertController: AlertController,
              private loadingController: LoadingController) {}

  hideLoading(): Promise<any> {
    return this.loading.dismiss();
  }

  showError(message) {
    this.hideLoading().then(() => {
      let alert = this.alertController.create({
        title: 'Error',
        subTitle: message || 'An error occured.',
        buttons: ['OK']
      });
      alert.present();
    })
  }

  showLoading(content?) {
    this.loading = this.loadingController.create({
      content: content || 'Please wait...'
    });
    this.loading.present();
  }

}

