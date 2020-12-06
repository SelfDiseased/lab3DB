const DepartmentController = require('../controllers/DepartmentController');
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

class DepartmentView {
    constructor(mainMenu, sequelize) {
        this.mainMenu = mainMenu;
        this.departmentController = new DepartmentController(sequelize);
    }

    departmentMenu() {
        console.clear()
        rl.question(
            "Department Menu\n1. Add\n2. Delete\n3. Update\n4. Get\n",
            (answer) => {
                switch (answer) {
                    case "1":
                        this.departmentAdd()
                        break
                    case "2":
                        this.departmentDelete()
                        break
                    case "3":
                        this.departmentUpdate()
                        break
                    case "4":
                        this.departmentAll()
                        break
                    default:
                        this.mainMenu()
                        break
                }
            }
        )
    }

    async departmentAdd() {
        console.clear()
        rl.question("Department title : ", (departmentTitle) => {
            if (!departmentTitle) this.departmentAdd()
            else {
                this.departmentController.insert(departmentTitle)
                rl.question(
                    `Department inserted\nPress any key to continue`,
                    () => {
                        this.departmentMenu()
                    }
                )
            }
        })
    }

    async departmentDelete() {
        console.clear()
        const departments = await this.departmentController.getAll()
        rl.question(
            `Choose the id of department that you want to delete : \n${JSON.stringify(
                departments
            )}`,
            async (deleteId) => {
                const isDepartment = departments.find((value) => {
                    if (value.id == Number(deleteId)) return true
                })
                if (isDepartment) {
                    await this.departmentController.delete(Number(deleteId))
                    rl.question(
                        "Deartment deleted!\n Press any key to continue",
                        () => this.departmentMenu()
                    )
                } else {
                    this.departmentMenu()
                }
            }
        )
    }

    async departmentUpdate() {
        console.clear()
        const departments = await this.departmentController.getAll()
        rl.question(
            `Choose the id of item that you want to update : \n${JSON.stringify(
                departments
            )}`,
            async (updateId) => {
                const isDepartment = departments.find((value) => {
                    if (value.id == Number(updateId)) return true
                })
                if (isDepartment) {
                    rl.question("Department name : ", async (DepartmentName) => {
                        if (!DepartmentName) await this.departmentUpdate()
                        else {
                            await this.departmentController.updateById(
                                Number(updateId),
                                DepartmentName
                            )
                            rl.question(
                                `Press Any key to continue`,
                                () => this.departmentMenu()
                            )
                        }
                    })
                } else {
                    rl.question("No departments found by id!", () => {
                        this.departmentMenu()
                    })
                }
            }
        )
    }

    async departmentAll() {
        console.clear()
        const departmentes = await this.departmentController.getAll()
        rl.question(`All departments : \n ${JSON.stringify(departmentes)}`, () => {
            this.departmentMenu()
        })
    }
}

module.exports = DepartmentView