const UUID = require('uuid-int');
const Sequelize = require("sequelize");

module.exports = function (sequelize) {

    const DepartmentModel = sequelize.define("department", {
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

    DepartmentModel.getAll = () => {
        return DepartmentModel.findAll()
        .catch(err => console.error(err));
      };
  
    DepartmentModel.getById = (id) => {
        return DepartmentModel.findByPk(id)
        .catch(err => console.error(err));
    };

    DepartmentModel.searchByName = (name) => {
        return DepartmentModel.findAll({
            where: { name: name } 
        })
        .catch(err => console.error(err));
    }

    DepartmentModel.insert = (name, id=UUID(0).uuid()) => {
        return DepartmentModel.create({ id, name })
          .catch(err => console.error(err));
    };
  
    DepartmentModel.updateById = (id, name) => {
        DepartmentModel.update({ name }, { 
            where: { id: id } 
        })
        .catch(err => console.error(err));
    };
  
    DepartmentModel.delete = (id) => {
        return DepartmentModel.destroy({where: { id: id }})
        .catch(err => console.error(err));
    };

    return DepartmentModel;
};