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
		// const tagName = interaction.options.getString('name');
		// const tagDescription = interaction.options.getString('description');
		// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
		await this.Lists.create({
			tag: tag,
			list: todoList,
		});
	}
}

module.exports = { Database } ;