import {EmailPasswordCredentials} from "angularfire2/providers/auth_backend";

export interface RegisterCredentials extends EmailPasswordCredentials {
  username: string;
}
