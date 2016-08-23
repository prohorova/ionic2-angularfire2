import {AuthMethods, AuthProviders} from 'angularfire2';

export const config = {
  apiKey: "AIzaSyDOlKCQ6qome_AQh1GpU1TBV-MhBOvCKLI",
  authDomain: "ionic2-73b2e.firebaseapp.com",
  databaseURL: "https://ionic2-73b2e.firebaseio.com",
  storageBucket: "ionic2-73b2e.appspot.com",
};

export const authConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
