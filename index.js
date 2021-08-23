//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []
var count =0;

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = tasks.length + 1;
    tasks.push(req.body);
    console.log(req.body);
    res.send("OK");
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});


app.get('/tasks/:tasksId', (req, res) => {
    var idTask = parseInt(req.params.idTask);
    var tas = tasks.findIndex( aux => aux.idTask === idTask);
    res.json(tasks[tas]);
    
});

app.put('/tasks/:taskId', jsonParser, function(req, res) {
    var idTask = parseInt(req.params.idTask);
    var tas = tasks.findIndex( aux => aux.idTask === idTask);
    const status = req.query.status; 
    if (status) {
        tasks[tas].status = status;
        res.send("Su status ha cambiado");
    } else {
        tasks[tas].title = req.body.title;
        tasks[tas].detail = req.body.detail;
        count=tas+1;
        res.send("Su status ha cambiado");
    }
});


app.delete('/tasks/:taskId', function (req, res) {
    var idTask = parseInt(req.params.idTask);
    tasks.splice( idTask-1, 1 );
    res.send("Se elimino la tarea");
});


app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});