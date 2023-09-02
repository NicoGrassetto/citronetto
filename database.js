const Sequelize = require('sequelize');
const { TODOList } = require('./templates/listTemplate.js');

/**
 * Represents a database for managing TODO lists.
 *
 * @class Database
 */
class Database {
	/**
	 * Creates a new Database instance.
	 *
	 * @constructor
	 */
	constructor() {
		this.sequelize = new Sequelize('database', 'user', 'password', {
			host: 'localhost',
			dialect: 'sqlite',
			logging: false,
			storage: 'database.sqlite',
		});

		this.Lists = this.sequelize.define('lists', {
			tag: {
				type: Sequelize.STRING,
				unique: true,
			},
			list: {
				type: Sequelize.TEXT,
			},
		});
	}

	/**
	 * Synchronizes the database schema.
	 *
	 * @memberof Database
	 * @function sync
	 */
	sync() {
		this.Lists.sync();
	}

	/**
	 * Adds a new TODO list to the database.
	 *
	 * @param {string} tag - The tag associated with the TODO list.
	 * @param {string} todoList - A string representation of a TODO list.
	 * @throws {Error} If tag is not a string or todoList is not a string representation of TODOList.
	 * @memberof Database
	 * @function addTODOList
	 */
	async addTODOList(tag, todoList) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		if (typeof todoList !== 'string') {
			throw new Error('todoList should be an string representation of TODOList (see JSON.stringify).');
		}
		const existingList = await this.Lists.findOne({ where: { tag: tag } });
		if (existingList) {
			// A todo list with the same tag already exists
			throw new Error('You already have an active todo list');
		}
		await this.Lists.create({
			tag: tag,
			list: todoList,
		});
	}
	/**
	 * Checks if a TODO list with the given tag already exists in the database.
	 *
	 * @param {string} tag - The tag to check for existence.
	 * @returns {boolean} True if a TODO list with the given tag exists, otherwise false.
	 * @throws {Error} If tag is not a string.
	 * @memberof Database
	 * @function alreadyInDB
	 */
	async alreadyInDB(tag) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		const existingList = await this.Lists.findOne({ where: { tag: tag } });

		if (existingList) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * Deletes a task from a TODO list with the given tag at the specified index.
	 *
	 * @param {string} tag - The tag associated with the TODO list.
	 * @param {number} index - The index of the task to delete.
	 * @returns {Object} The updated TODO list after task deletion.
	 * @throws {Error} If tag is not a string.
	 * @memberof Database
	 * @function deleteTaskFromTODOList
	 */
	async deleteTaskFromTODOList(tag, index) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		const userList = await this.Lists.findOne({ where: { tag: tag } });
		const listData = JSON.parse(userList['dataValues']['list']);
		const listObj = new TODOList(listData.descriptions, listData.statuses);
		listObj.deleteTask(index);

		if (listObj.descriptions.length === 0) {
			this.resetTODOList(tag);
			const listStr = JSON.stringify(listObj);
			return JSON.parse(listStr);
		}
		else {
			const listStr = JSON.stringify(listObj);
			await this.Lists.update({ list: listStr }, { where: { tag: tag } });
			return JSON.parse(listStr);
		}
	}

	/**
	 * Resets a TODO list with the given tag, effectively deleting it from the database.
	 *
	 * @param {string} tag - The tag associated with the TODO list to reset.
	 * @returns {Promise} A Promise that resolves when the TODO list is successfully reset.
	 * @throws {Error} If tag is not a string.
	 * @memberof Database
	 * @function resetTODOList
	 */
	async resetTODOList(tag) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		return await this.Lists.destroy({ where: { tag: tag } });
	}

	/**
	 * Undoes the status of a task in a TODO list with the given tag at the specified index.
	 *
	 * @param {string} tag - The tag associated with the TODO list.
	 * @param {number} index - The index of the task to undo.
	 * @returns {Object} The updated TODO list after task status update.
	 * @throws {Error} If tag is not a string.
	 * @memberof Database
	 * @function undoTask
	 */
	async undoTask(tag, index) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		const userList = await this.Lists.findOne({ where: { tag: tag } });
		const listData = JSON.parse(userList['dataValues']['list']);
		const listObj = new TODOList(listData.descriptions, listData.statuses);
		listObj.setStatus(false, index);

		const listStr = JSON.stringify(listObj);
		await this.Lists.update({ list: listStr }, { where: { tag: tag } });
		return JSON.parse(listStr);
	}

	/**
	 * Modifies the description of a task in a TODO list with the given tag at the specified index.
	 *
	 * @param {string} tag - The tag associated with the TODO list.
	 * @param {number} index - The index of the task to modify.
	 * @param {string} newDescription - The new description for the task.
	 * @returns {Object} The updated TODO list after task description modification.
	 * @memberof Database
	 * @function modifyTaskDescriptionFromTODOList
	 */
	async modifyTaskDescriptionFromTODOList(tag, index, newDescription) {
		const userList = await this.Lists.findOne({ where: { tag: tag } });
		const listData = JSON.parse(userList['dataValues']['list']);
		const listObj = new TODOList(listData.descriptions, listData.statuses);
		listObj.setDescription(newDescription, index);
		const listStr = JSON.stringify(listObj);
		await this.Lists.update({ list: listStr }, { where: { tag: tag } });
		return JSON.parse(listStr);
	}

	/**
	 * Sets the status of a task in a TODO list with the given tag at the specified index to "done."
	 *
	 * @param {string} tag - The tag associated with the TODO list.
	 * @param {number} index - The index of the task to mark as "done."
	 * @returns {Object} The updated TODO list after task status update.
	 * @throws {Error} If tag is not a string.
	 * @memberof Database
	 * @function setTaskToDone
	 */
	async setTaskToDone(tag, index) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		const userList = await this.Lists.findOne({ where: { tag: tag } });
		const listData = JSON.parse(userList['dataValues']['list']);
		const listObj = new TODOList(listData.descriptions, listData.statuses);
		listObj.setStatus(true, index);

		const listStr = JSON.stringify(listObj);
		await this.Lists.update({ list: listStr }, { where: { tag: tag } });
		return JSON.parse(listStr);
	}

	/**
	 * Adds a new task to a TODO list with the given tag, appending it to the end of the list.
	 *
	 * @param {string} tag - The tag associated with the TODO list.
	 * @param {string} description - The description of the new task.
	 * @returns {Object} The updated TODO list after task addition.
	 * @memberof Database
	 * @function addTaskToTODOList
	 */
	async addTaskToTODOList(tag, description) {
		const userList = await this.Lists.findOne({ where: { tag: tag } });
		const listData = JSON.parse(userList['dataValues']['list']);
		const listObj = new TODOList(listData.descriptions, listData.statuses);
		listObj.addTask(description);
		const listStr = JSON.stringify(listObj);
		await this.Lists.update({ list: listStr }, { where: { tag: tag } });
		return JSON.parse(listStr);
	}

	/**
	 * Retrieves the TODO list associated with the given tag from the database.
	 *
	 * @param {string} tag - The tag associated with the TODO list to retrieve.
	 * @returns {Object} The retrieved TODO list.
	 * @throws {Error} If tag is not a string.
	 * @memberof Database
	 * @function getTODOList
	 */
	async getTODOList(tag) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		const list = await this.Lists.findOne({ where: { tag: tag } });
		return JSON.parse(list['dataValues']['list']);
	}
}

module.exports = { Database };