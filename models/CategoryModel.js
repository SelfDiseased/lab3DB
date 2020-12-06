const UUID = require('uuid-int');
const Sequelize = require("sequelize");

module.exports = function (sequelize) {

    const CategoryModel = sequelize.define("category", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });

    CategoryModel.getAll = () => {
        return CategoryModel.findAll()
        .catch(err => console.error(err));
      };
  
    CategoryModel.getById = (id) => {
        return CategoryModel.findByPk(id)
        .catch(err => console.error(err));
    };

    CategoryModel.searchByName = (name) => {
        return CategoryModel.findAll({
            where: { name: name } 
        })
        .catch(err => console.error(err));
    }

    CategoryModel.insert = (name, id=UUID(0).uuid()) => {
        return CategoryModel.create({ id, name })
          .catch(err => console.error(err));
    };
  
    CategoryModel.updateById = (id, name) => {
        CategoryModel.update({ name }, { 
            where: { id: id } 
        })
        .catch(err => console.error(err));
    };
  
    CategoryModel.delete = (id) => {
        return CategoryModel.destroy({where: { id: id }})
        .catch(err => console.error(err));
    };

    return CategoryModel;
};