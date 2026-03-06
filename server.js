const express = require('express');
const app = express();
const { readEmployees, writeEmployees } = require('./modules/fileHandler');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const employees = await readEmployees();
    res.render('index', { employees });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {

    const employees = await readEmployees();

    let department = req.body.department;

    if (Array.isArray(department)) {
        department = department.join(', ');
    }

    const newEmployee = {
        id: Date.now(),
        name: req.body.Name,
        profile: req.body.profile,
        gender: req.body.gender,
        department: department,
        salary: Number(req.body.salary),
        startDate: `${req.body.day} ${req.body.month} ${req.body.year}`
    };

    employees.push(newEmployee);
    await writeEmployees(employees);

    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    const id = Number(req.params.id);
    let employees = await readEmployees();

    employees = employees.filter(emp => emp.id !== id);

    await writeEmployees(employees);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});