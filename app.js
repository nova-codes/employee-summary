const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");

// create empty array to push new team members to
const newTeam = [];

// invoke promptAddNewEmployee function
promptAddNewEmployee();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptAddNewEmployee() {
    inquirer.prompt([
        {
            type: listenerCount,
            name: 'add',
            message: 'Add a new employee to your team?',
            choices: [
                'yes',
                'no'
            ]
        }
    ])
    .then(function(data) {
        if(data.add === 'yes') {
            addEmployee();
        } else {
            writeFile(); 
        }
    })
}

// add employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Select the employee\'s role',
            choices: [
                'intern',
                'engineer',
                'manager'
            ]
        }
    ])
    .then(function(data) {
        if(data.role === 'manager') {
            addManager();
        } 
        else if(data.role === 'engineer'){
            addEngineer();
        }
        else {
            addIntern(); 
        }
    })
}

// function to add manager to array
function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the full name of the manager:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID for the manager:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address for the manager:'
        },
        {
            type: 'input',
            name: 'office',
            message: 'Enter the office number for the manager:'
        }
    ])
    .then(function(data){
        const employee = new Manager(data.name, data.id, data.email, data.office);
        newTeam.push(employee);
        promptAddNewEmployee();
    });
}

// function to add engineer to array
function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the full name of the engineer:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID for the engineer:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address for the engineer:'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter the Github username for the engineer:'
        }
    ])
    .then(function(data){
        const employee = new Engineer(data.name, data.id, data.email, data.github);
        newTeam.push(employee);
        promptAddNewEmployee();
    });
}

// function to add intern to array
function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the full name of the intern:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID for the intern:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address for the intern:'
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter the name of the intern\'s school:'
        }
    ])
    .then(function(data){
        const employee = new Intern(data.name, data.id, data.email, data.school);
        newTeam.push(employee);
        promptAddNewEmployee();
    });
}

// stop the prompts and generate files
function writeFile() {
    console.log("Creating your file. Check output folder for result.");

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(outputPath, render(newTeam), "utf-8");
}