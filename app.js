const ItemView = require('./views/ItemView');
const CategoryView = require("./views/CategoryView");
const DepartmentView = require("./views/DepartmentView");
const OrderView = require("./views/OrderView");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const sequelize = require('./sequelize/index').sequelize;

//const Item = require('./controllers/ItemController')
//const item = new Item(sequelize)
//item.getAll().then(res => console.log(res));


const init = () => {
    console.clear()
    rl.question("Menu\n 1. Items 2. Categories 3. Departments\n4. Orders\n", (answer) => {
        switch (answer) {
            case "1":
                console.clear();
                const itView = new ItemView(init, sequelize);
                itView.itemMenu()
                break
            case "2":
                console.clear()
                const catView = new CategoryView(init, sequelize)
                catView.categoryMenu();
                
                break
            case "3":
                console.clear()
                const depView = new DepartmentView(init, sequelize)
                depView.departmentMenu()
                
                break
            case "4":
                console.clear()
                const orView = new OrderView(init, sequelize);
                orView.orderMenu();
                
                break
            default:
                console.clear()
                init()
                break
        }
    })
}

init();
