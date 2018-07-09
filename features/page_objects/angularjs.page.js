let AngularJSPage = function() {

    //Hello
    this.appHello = element(by.css('[app-run="hello.html"]'));
    this.inputName = this.appHello.element(by.model('yourName'));

    //To Do list
    this.appToDo = element(by.css('[app-run="todo.html"]'));
    this.inputToDo = this.appToDo.element(by.model("todoList.todoText"));
    this.btnAdd = this.appToDo.element(by.css("input.btn-primary"));
    this.listToDo = element.all(by.repeater('todo in todoList.todos'));

};

module.exports = new AngularJSPage();