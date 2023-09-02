class TODOList {
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

	addTask(taskDescription) {
		if (typeof taskDescription !== 'string') {
			throw new Error('taskDescription must be a string.');
		}
		console.log('asdasd');
		this.descriptions.push(taskDescription);
		this.statuses.push(false);
	}

	deleteTask(index) {
		if (index >= 0 && index < this.descriptions.length) {
			this.descriptions.splice(index, 1);
			this.statuses.splice(index, 1);
		}
		else {
			throw new Error(`Invalid index ${index}.`);
		}
	}

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