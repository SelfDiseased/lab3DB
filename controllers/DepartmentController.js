class DepartmentController {
    constructor(sequelize) {
        this.departmentModel = require('../models/DepartmentModel')(sequelize);
    }

    async getAll() {
        const categories = await this.departmentModel.getAll();

        if (!categories) {
            return Error('There are no categories!');
        }

        return categories;
    }

    async getById(id) {
        const department = await this.departmentModel.getById(id);

        if (!department) {
            return Error(`There is no department with id ${id}!`);
        }

        return department;
    }

    async searchByName(name) {
        const department = await this.departmentModel.searchByName(name);

        if (!department) {
            return Error(`There are no categories with name ${name}!`);
        }

        return department;
    }

    async updateById(id, name) {
        const department = await this.departmentModel.updateById(id, name);

        if (!department) {
            return Error(`There is no department with id ${id}!`);
        }

        return department;
    }

    async insert(name) {
        const department = await this.departmentModel.insert(name);

        if (!department) {
            return Error(`Can't insert department!`);
        }

        return department;
    }

    async delete(id) {
        const categories = await this.departmentModel.delete(id);

        if (!categories) {
            return Error('There are no !');
        }

        return categories;
    }
}


module.exports = DepartmentController;