const Sequelize = require('sequelize');
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

	// async deleteTaskFromTODOList(tag, index) {
	// 	if (tag instanceof 'string') {
	// 		throw new Error('tag should be a string.');
	// 	}
	// 	const userList = await this.Lists.findOne({ where: { tag: tag } });
	// 	const listData = JSON.parse(userList.list);

	// 	// Reconstruct an instance of TODOList with parsed data
	// 	const list = new TODOList(listData._tasks);
	// 	// Call the deleteTasks method on the instance
	// 	list.deleteTasks(index);
	// 	await this.Lists.update({ list: JSON.stringify(list) }, { where: { tag: tag } });
	// }

	async resetTODOList(tag) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		return await this.Lists.destroy({ where: { tag: tag } });
	}

	// async undoTask(tag, index) {
	// 	const userList = await this.Lists.findOne({ where: { tag: tag } });
	// 	const listData = JSON.parse(userList.list);

	// 	// Reconstruct an instance of TODOList with parsed data
	// 	const list = new TODOList(listData._tasks);
	// 	// Call the deleteTasks method on the instance
	// 	list.UndoTasks(index);
	// 	await this.Lists.update({ list: JSON.stringify(list) }, { where: { tag: tag } });
	// }

	// async modifyTaskDescriptionFromTODOList(tag, index, newDescription) {
	// 	const userList = await this.Lists.findOne({ where: { tag: tag } });
	// 	const listData = JSON.parse(userList.list);

	// 	// Reconstruct an instance of TODOList with parsed data
	// 	const list = new TODOList(listData._tasks);
	// 	list.setDescriptions({ 'index': index, 'description': newDescription });
	// 	await this.Lists.update({ list: JSON.stringify(list) }, { where: { tag: tag } });
	// }

	// async setTaskToDone(tag, index) {
	// 	const userList = await this.Lists.findOne({ where: { tag: tag } });
	// 	const listData = JSON.parse(userList.list);

	// 	// Reconstruct an instance of TODOList with parsed data
	// 	const list = new TODOList(listData._tasks);
	// 	// Call the deleteTasks method on the instance
	// 	list.setTasksToDone(index);
	// 	await this.Lists.update({ list: JSON.stringify(list) }, { where: { tag: tag } });
	// }

	// async addTaskToTODOList(tag, description) {
	// 	const userList = await this.Lists.findOne({ where: { tag: tag } });
	// 	const listData = JSON.parse(userList.list);

	// 	// Reconstruct an instance of TODOList with parsed data
	// 	const list = new TODOList(listData._tasks);
	// 	// Call the deleteTasks method on the instance
	// 	list.addTasks(description);
	// 	await this.Lists.update({ list: JSON.stringify(list) }, { where: { tag: tag } });
	// }

	// async getTODOList(tag) {
	// 	const userList = await this.Lists.findOne({ where: { tag: tag } });
	// 	const listData = JSON.parse(userList.list);

	// 	// Reconstruct an instance of TODOList with parsed data
	// 	const list = new TODOList(listData._tasks);
	// 	return { 'descriptions': list.getDescriptions(), 'statuses': list.getStatuses() };
	// }

	async getTODOList(tag) {
		if (typeof tag !== 'string') {
			throw new Error('tag should be a string.');
		}
		const list = await this.Lists.findOne({ where: { tag: tag } });
		return JSON.parse(list['dataValues']['list']);
	}
}

module.exports = { Database };