import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

import "./styles/todo-mvc.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { content: "AAA", complete: true },
        { content: "BBB", complete: false },
        { content: "CCC", complete: true }
      ],
      visibility: "completed"
    };
  }
  // 添加toto
  addTodo(todo) {
    this.state.todos.push(todo);
    this.setState({
      todos: this.state.todos
    });
  }
  // 删除todo
  deleteTodo(todo) {
    let index = this.state.todos.findIndex(t => t == todo);
    this.state.todos.splice(index, 1);
    this.setState({
      todos: this.state.todos
    });
  }
  // 切换单个todo状态
  toggleTodo(todo) {
    let index = this.state.todos.findIndex(t => t == todo);
    this.state.todos[index].complete = !this.state.todos[index].complete;
    this.setState({
      todos: this.state.todos
    });
  }
  // 批量切换todo的状态  done表示true或false
  toggleAll(done) {
    this.state.todos.forEach(todo => (todo.complete = done));
    this.setState({
      todos: this.state.todos
    });
  }
  // 判断所有todo的complete
  allChecked() {
    // let res = this.state.todos.every(function(todo){
    //     // todo　每一个todo
    //     return todo.complete == true
    // })
    // return res;
    return this.state.todos.every(todo => todo.complete);
  }
  // 未完成的有多少个
  leftTodo() {
    //    return this.state.todos.filter(todo=>todo.complete==false).length;
    return this.state.todos.filter(todo => todo.complete == false).length;
  }
  // 根据visibility筛选出某些todo
  filterTodos() {
    switch (this.state.visibility) {
      case "all":
        return this.state.todos;
      case "active":
        return this.state.todos.filter(todo => !todo.complete);
      case "completed":
        return this.state.todos.filter(todo => todo.complete);
      default:
        break;
    }
  }
  // 改变visibility的值
  setVisibility(flag) {
    this.setState({
      visibility: flag
    });
  }
  //   删除所有已完成的
  delededone() {
    this.state.todos.forEach((item,index) => {
        if(item.complete){
            this.state.todos.splice(index,1)
        }
    });
    this.setState({
      todos:this.state.todos
    })
    // this.forceUpdate();
  }
  render() {
    return (
      <div>
        <AddTodo addTodo={this.addTodo.bind(this)}></AddTodo>
        <TodoList
          allChecked={this.allChecked()}
          toggleAll={this.toggleAll.bind(this)}
          toggleTodo={this.toggleTodo.bind(this)}
          deleteTodo={this.deleteTodo.bind(this)}
          todos={this.filterTodos()}
        ></TodoList>
        <Footer
          delededone={this.delededone.bind(this)}
          visibility={this.state.visibility}
          leftTodos={this.leftTodo()}
          setVisibility={this.setVisibility.bind(this)}
        ></Footer>
      </div>
    );
  }
}

export default App;
