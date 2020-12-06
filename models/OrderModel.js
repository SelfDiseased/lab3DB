const UUID = require('uuid-int');
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = function (sequelize) {

    const OrderModel = sequelize.define("order", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      customer_email: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });

    OrderModel.getAll = () => {
        return OrderModel.findAll()
        .catch(err => console.error(err));
      };
  
    OrderModel.getById = (id) => {
        return OrderModel.findByPk(id)
        .catch(err => console.error(err));
    };

    OrderModel.searchByEmail = (email) => {
        return OrderModel.findAll({
            where: { email: email } 
        })
        .catch(err => console.error(err));
    }

    OrderModel.searchByDate = (from, to) => {
        return OrderModel.findAll({
            where: {
                delivery_date: {
                    [Op.gte]: from,
                    [Op.lte]: to
                }
            }
        })
        .catch(err => console.error(err));
    }

    OrderModel.insert = (delivery_date, customer_email, id=UUID(0).uuid()) => {
        return OrderModel.create({ id, delivery_date, customer_email })
          .catch(err => console.error(err));
    };
  
    OrderModel.updateById = (id, delivery_date, customer_email) => {
        OrderModel.update({ delivery_date, customer_email }, { 
            where: { id: id } 
        })
        .catch(err => console.error(err));
    };
  
    OrderModel.delete = (id) => {
        return OrderModel.destroy({where: { id: id }})
        .catch(err => console.error(err));
    };

    return OrderModel;
};