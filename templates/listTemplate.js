const TaskStatuses = {
	TODO: Symbol('TODO'),
	DONE: Symbol('DONE'),
};

class TODOList {
	constructor(tasks) {
		if (!Array.isArray(tasks) || tasks.length === 0) {
			throw new Error('TODO list must contain at least one task.');
		}

		this._tasks = tasks;
		this._tasks.map((task) => ({ taskDescription: task, taskStatus: TaskStatuses.TODO }));
	}

	addTasks(newTasks) {
		if (Array.isArray(newTasks)) {
			newTasks.map((task) => ({ taskDescription: task, taskStatus: TaskStatuses.TODO }));
			this._tasks = this._tasks.concat(newTasks);
		}
		else {
			this._tasks.push({ taskDescription: newTasks, taskStatus: TaskStatuses.TODO });
		}
	}

	deleteTasks(... indices) {
		// Sort the indices in descending order to avoid issues with changing array length during deletion
		indices.sort((a, b) => b - a);

		for (const index of indices) {
			if (index >= 0 && index < this._tasks.length) {
				// Delete the task at the given index
				this._tasks.splice(index, 1);
			}
		}
	}
}

module.exports = TODOList;