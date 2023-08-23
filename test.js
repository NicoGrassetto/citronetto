const { TODOList } = require('./templates/listTemplate.js');

const todoList = new TODOList(['Programming', 'Workout']);

console.log(todoList.tasksDescriptions);
console.log(todoList.taskStatuses);

todoList.addTask('Singing');

console.log(todoList.tasksDescriptions);
console.log(todoList.taskStatuses);

todoList.deleteTask(4);

console.log(todoList.tasksDescriptions);
console.log(todoList.taskStatuses);