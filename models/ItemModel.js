const UUID = require('uuid-int');
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = function (sequelize) {

    const ItemModel = sequelize.define("item", {
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
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      availability: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });

    ItemModel.getAll = () => {
        return ItemModel.findAll()
        .catch(err => console.error(err));
      };
  
    ItemModel.getById = (id) => {
        return ItemModel.findByPk(id)
        .catch(err => console.error(err));
    };

    ItemModel.searchByAvailability = (availability) => {
        return ItemModel.findAll({
            where: { availability: availability } 
        })
        .catch(err => console.error(err));
    }

    ItemModel.searchByName = (name) => {
        return ItemModel.findAll({
            where: { name: name } 
        })
        .catch(err => console.error(err));
    }

    ItemModel.searchByPrice = (priceMin, priceMax) => {
        return ItemModel.findAll({
            where: {
                price: {
                    [Op.gte]: priceMin,
                    [Op.lte]: priceMax
                }
            }
        })
        .catch(err => console.error(err));
    }

    ItemModel.insert = (price, availability, name, id=UUID(0).uuid()) => {
        return ItemModel.create({ id, price, availability, name })
          .catch(err => console.error(err));
    };
  
    ItemModel.updateById = (id, price, availability, name) => {
        ItemModel.update({ price, availability, name }, { 
            where: { id: id } 
        })
        .catch(err => console.error(err));
    };
  
    ItemModel.delete = (id) => {
        return ItemModel.destroy({where: { id: id }})
        .catch(err => console.error(err));
    };

    return ItemModel;
};