const inquirer = require('inquirer');


inquirer.prompt([
    { type: 'input', message:"test-pick", name:"test"}
]).then(answers => {
    console.log(answers)
})