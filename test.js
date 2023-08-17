const { Database } = require('./database.js');
const { tasksToString } = require('./utils.js');
const { TODOList } = require('./templates/listTemplate.js');

// const tag = '12312312312312';
// const list = new TODOList(['12312313123adasdasdas', 'asdsadasdddd']);
// console.log(list.getTaskStatusesAsBoolean());
// list.setTasksToDone(0);
// console.log(list.getTaskStatusesAsBoolean());

// console.log(tasksToString(list.getDescriptions(), list.getTaskStatusesAsBoolean()));

const db = new Database();
// db.resetTODOList('972158965913882675');

