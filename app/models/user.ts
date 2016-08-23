import { Todo } from './todo';

export interface User {
  username: string;
  todos?: Todo[];
  pic?: string;
}
