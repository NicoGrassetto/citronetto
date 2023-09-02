const Sequelize = require('sequelize');
const { TODOList } = require('./templates/listTemplate.js');
class Database {
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

	sync() {
		this.Lists.sync();
	}

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

	async resetTODOList(tag) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		return await this.Lists.destroy({ where: { tag: tag } });
	}

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

	async modifyTaskDescriptionFromTODOList(tag, index, newDescription) {
		const userList = await this.Lists.findOne({ where: { tag: tag } });
		const listData = JSON.parse(userList['dataValues']['list']);
		const listObj = new TODOList(listData.descriptions, listData.statuses);
		listObj.setDescription(newDescription, index);
		const listStr = JSON.stringify(listObj);
		await this.Lists.update({ list: listStr }, { where: { tag: tag } });
		return JSON.parse(listStr);
	}

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

	async addTaskToTODOList(tag, description) {
		const userList = await this.Lists.findOne({ where: { tag: tag } });
		const listData = JSON.parse(userList['dataValues']['list']);
		const listObj = new TODOList(listData.descriptions, listData.statuses);
		listObj.addTask(description);
		const listStr = JSON.stringify(listObj);
		await this.Lists.update({ list: listStr }, { where: { tag: tag } });
		return JSON.parse(listStr);
	}

	async getTODOList(tag) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		const list = await this.Lists.findOne({ where: { tag: tag } });
		return JSON.parse(list['dataValues']['list']);
	}
}

module.exports = { Database };