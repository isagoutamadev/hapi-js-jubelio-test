const { exec } = require('node:child_process');
const { CONTROLLER, SERVICE, MODEL, ROUTE } = require('./template');
const fs = require('fs');
const args = process.argv.slice(2);
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function validateLettersOnly(str) {
    // Regular expression pattern to match only letters
    const pattern = /^[a-zA-Z]+$/;
    
    // Test the input string against the pattern
    return pattern.test(str);
}

const moduleName = capitalizeFirstLetter(args[1]);
const moduleNameLower = moduleName.toLowerCase();

// create module resources
if (args[0] === 'make:module') {
    if (!validateLettersOnly(moduleName)) {
        throw new Error("Only letters allowed, no numbers or symbols ");
    }
    
    // CREATE CONTROLLER
    const controllerContent = CONTROLLER.replace(/{MODULE_NAME_LOWER}/g, moduleNameLower)
        .replace(/{MODULE_NAME}/g, moduleName);
    
    fs.writeFile(`${__dirname}/src/controllers/${moduleName}Controller.js`, controllerContent, function (err) {
        if (err) throw err;
        console.log(`${moduleName}Controller.js`);
    })
    
    // CREATE SERVICE
    const serviceContent = SERVICE.replace(/{MODULE_NAME_LOWER}/g, moduleNameLower)
    .replace(/{MODULE_NAME}/g, moduleName);

    fs.writeFile(`${__dirname}/src/services/${moduleName}Service.js`, serviceContent, function (err) {
        if (err) throw err;
        console.log(`${moduleName}Service.js`);
    })
   
    // CREATE MODEL
    const modelContent = MODEL.replace(/{MODULE_NAME_LOWER}/g, moduleNameLower)
    .replace(/{MODULE_NAME}/g, moduleName);
    fs.writeFile(`${__dirname}/src/models/${moduleName}Model.js`, modelContent, function (err) {
        if (err) throw err;
        console.log(`${moduleName}Model.js`);
    })
    
    // CREATE ROUTE
    const routeContent = ROUTE.replace(/{MODULE_NAME_LOWER}/g, moduleNameLower)
    .replace(/{MODULE_NAME}/g, moduleName);
    fs.writeFile(`${__dirname}/src/routes/${moduleName}Route.js`, routeContent, function (err) {
        if (err) throw err;
        console.log(`${moduleName}Route.js`);
    })
}

