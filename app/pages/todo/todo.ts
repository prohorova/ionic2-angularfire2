import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';
import { Todo } from '../../models/todo';
import { LoginPage } from "../login/login";

/*
 Generated class for the TodoPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/todo/todo.html',
})
export class TodoPage {
  todos:FirebaseListObservable<Todo[]>;

  constructor(private navController:NavController,
              private auth: FirebaseAuth,
              private alertController:AlertController,
              private af:AngularFire) {
  }

  ionViewLoaded() {
    this.auth.subscribe(authState => {
      if (authState) {
        this.todos = this.af.database.list(`/users/${authState.uid}/todos`);
      } else {
        this.todos = null;
      }
    })
  }

  createTodo() {
    this.modifyTodo();
  }

  removeTodo(index) {
    this.todos.remove(index);
  }

  editTodo(todo: any) {
    this.modifyTodo(todo);
  }

  private modifyTodo(todo?: any) {
    let alert = this.alertController.create({
      title: todo ? 'Edit todo' : 'Create todo',
      inputs: [{
        name: 'todo',
        value: todo && todo.content || ''
      }],
      buttons: [{
        text: 'Save',
        handler: (data) => {
          if (data.todo) {
            if (todo) {
              this.todos.update(todo.$key, {content: data.todo});
            } else {
              this.todos.push({content: data.todo});
            }
          } else {
            return false;
          }
        }
      }]
    });
    alert.present();
  }

}
