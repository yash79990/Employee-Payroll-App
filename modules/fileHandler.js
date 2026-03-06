const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'employees.json');

async function readEmployees() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log("Error reading file:", error);
        return [];
    }
}

async function writeEmployees(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("Error writing file:", error);
    }
}

module.exports = { readEmployees, writeEmployees };
