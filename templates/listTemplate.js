/**
 * Represents the status of a task.
 *
 * @enum {symbol}
 */
const TaskStatuses = {
	TODO: Symbol('TODO'),
	DONE: Symbol('DONE'),
};

/**
 * Represents a TODOList containing tasks.
 *
 * @class
 */
class TODOList {
	/**
	 * Creates a new TODOList instance.
	 *
	 * @constructor
	 * @param {Array} tasks - An array of tasks for the TODO list.
	 * @throws {Error} Throws an error if tasks is not an array or is empty.
	 */
	constructor(tasks) {
		if (!Array.isArray(tasks) || tasks.length === 0) {
			throw new Error('TODO list must contain at least one task.');
		}

		this._tasks = tasks;
		this._tasks.map((task) => ({ taskDescription: task, taskStatus: TaskStatuses.TODO }));
	}

	/**
	 * Adds new tasks to the TODO list.
	 *
	 * @param {Array|string} newTasks - New tasks to be added. Can be a single task or an array of tasks.
	 */
	addTasks(newTasks) {
		if (Array.isArray(newTasks)) {
			newTasks.map((task) => ({ taskDescription: task, taskStatus: TaskStatuses.TODO }));
			this._tasks = this._tasks.concat(newTasks);
		}
		else {
			this._tasks.push({ taskDescription: newTasks, taskStatus: TaskStatuses.TODO });
		}
	}

	/**
	 * Deletes tasks at specified indices from the TODO list.
	 *
	 * @param {...number} indices - Indices of tasks to be deleted.
	 * @throws {Error} Throws an error if an invalid index is provided.
	 */
	deleteTasks(...indices) {
		// Sort the indices in descending order to avoid issues with changing array length during deletion
		indices.sort((a, b) => b - a);

		for (const index of indices) {
			if (index >= 0 && index < this._tasks.length) {
				// Delete the task at the given index
				this._tasks.splice(index, 1);
			}
			else {
				throw new Error(`Invalid index ${index}.`);
			}
		}
	}

	/**
	 * Sets the status of tasks at specified indices to "DONE".
	 *
	 * @param {...number} indices - Indices of tasks to be marked as done.
	 * @throws {Error} Throws an error if an invalid index is provided.
	 */
	setTasksToDone(...indices) {
		for (const index of indices) {
			if (index >= 0 && index < this._tasks.length) {
				// Set the task status to DONE at the given index
				this._tasks[index].taskStatus = TaskStatuses.DONE;
			}
			else {
				throw new Error(`Invalid index ${index}.`);
			}
		}
	}

	/**
	 * Sets the status of tasks at specified indices to "TODO".
	 *
	 * @param {...number} indices - Indices of tasks to be marked as undone.
	 * @throws {Error} Throws an error if an invalid index is provided.
	 */
	UndoTasks(...indices) {
		for (const index of indices) {
			if (index >= 0 && index < this._tasks.length) {
				// Set the task status to TODO at the given index
				this._tasks[index].taskStatus = TaskStatuses.TODO;
			}
			else {
				throw new Error(`Invalid index ${index}.`);
			}
		}
	}

	/**
	 * Sets the descriptions of tasks at specified indices.
	 *
	 * @param {...{index: number, description: string}} descriptions - Array of objects containing index and description for each task.
	 * @throws {Error} Throws an error if an invalid index is provided.
	 */
	setDescriptions(... descriptions) {
		for (const description of descriptions) {
			this._tasks[description.index].taskDescription = description.description;
		}
	}
}

module.exports = TODOList;