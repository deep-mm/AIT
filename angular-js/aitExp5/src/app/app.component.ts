// @ts-ignore
import { Component,trigger,animate,style,transition,keyframes } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aitExp5';
  todoArray = [];
  birthday = new Date(1997, 3, 6);
  power = 2;
  factor = 1;

  showBirthday(){
    this.birthday = new Date(1997, 4, 6);
  }

  addTodo(value) {
    if (value != "") {
      this.todoArray.push(value);
      console.log(this.todoArray);
    }
    else{
      alert('Field required **')
    }
  }

  deleteItem(index){
        this.todoArray.splice(index,1);
    }

  todoSubmit(value:any){
    if(value!==""){
      this.todoArray.push(value.todo)
      //this.todoForm.reset()
    }else{

    }

  }
}
