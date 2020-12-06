class CategoryController {
    constructor(sequelize) {
        this.categoryModel = require('../models/CategoryModel')(sequelize);
    }

    async getAll() {
        const categories = await this.categoryModel.getAll();

        if (!categories) {
            return Error('There are no categories!');
        }

        return categories;
    }

    async getById(id) {
        const category = await this.categoryModel.getById(id);

        if (!category) {
            return Error(`There is no category with id ${id}!`);
        }

        return category;
    }

    async searchByName(name) {
        const category = await this.categoryModel.searchByName(name);

        if (!category) {
            return Error(`There are no categories with name ${name}!`);
        }

        return category;
    }

    async updateById(id, name) {
        const category = await this.categoryModel.updateById(id, name);

        if (!category) {
            return Error(`There is no category with id ${id}!`);
        }

        return category;
    }

    async insert(name) {
        const category = await this.categoryModel.insert(name);

        if (!category) {
            return Error(`Can't insert category!`);
        }

        return category;
    }

    async delete(id) {
        const categories = await this.categoryModel.delete(id);

        if (!categories) {
            return Error('There are no !');
        }

        return categories;
    }
}


module.exports = CategoryController;