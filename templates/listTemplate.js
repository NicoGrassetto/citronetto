/**
 * Represents a TODO List with tasks and their statuses.
 *
 * @class TODOList
 */
class TODOList {
	/**
	 * Creates a new TODOList instance.
	 *
	 * @constructor
	 * @param {string[]} descriptions - An array of task descriptions.
	 * @param {boolean[]} [statuses] - An optional array of task statuses.
	 * @throws {Error} If descriptions is not an array or is empty, or if arguments are invalid.
	 */
	constructor(descriptions, statuses) {
		if (!Array.isArray(descriptions) || descriptions.length === 0) {
			throw new Error('descriptions must contain at least one task.');
		}
		if (arguments.length === 1) {
			this.descriptions = descriptions;
			this.statuses = this.descriptions.map(() => false);
		}
		else if (arguments.length === 2) {
			if (!Array.isArray(statuses) || statuses.length === 0) {
				throw new Error('statuses must contain at least one task.');
			}
			this.descriptions = descriptions;
			this.statuses = statuses;
		}
		else {
			throw new Error('Argument error: must contain at least a descriptions array.');
		}
	}
	/**
	 * Adds a new task to the TODO list.
	 *
	 * @param {string} taskDescription - The description of the task to add.
	 * @throws {Error} If taskDescription is not a string.
	 */
	addTask(taskDescription) {
		if (typeof taskDescription !== 'string') {
			throw new Error('taskDescription must be a string.');
		}
		console.log('asdasd');
		this.descriptions.push(taskDescription);
		this.statuses.push(false);
	}

	/**
	 * Deletes a task from the TODO list.
	 *
	 * @param {number} index - The index of the task to delete.
	 * @throws {Error} If index is out of bounds.
	 */
	deleteTask(index) {
		if (index >= 0 && index < this.descriptions.length) {
			this.descriptions.splice(index, 1);
			this.statuses.splice(index, 1);
		}
		else {
			throw new Error(`Invalid index ${index}.`);
		}
	}

	/**
	 * Sets the description of a task.
	 *
	 * @param {string} description - The new description for the task.
	 * @param {number} index - The index of the task to update.
	 * @throws {Error} If description is not a string or if index is out of bounds.
	 */
	setDescription(description, index) {
		if (typeof description !== 'string') {
			throw new Error('description must be a string.');
		}
		if (index >= 0 && index < this.descriptions.length) {
			this.descriptions[index] = description;
		}
		else {
			throw new Error(`Invalid index ${index}.`);
		}
	}

	/**
	 * Sets the status of a task.
	 *
	 * @param {boolean} status - The new status for the task.
	 * @param {number} index - The index of the task to update.
	 * @throws {Error} If status is not a boolean or if index is out of bounds.
	 */
	setStatus(status, index) {
		if (typeof status !== 'boolean') {
			throw new Error('status must be a boolean.');
		}
		if (index >= 0 && index < this.statuses.length) {
			this.statuses[index] = status;
		}
		else {
			throw new Error(`Invalid index ${index}.`);
		}
	}
}

module.exports = { TODOList };