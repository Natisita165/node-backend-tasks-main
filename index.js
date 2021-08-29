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
    count++;
    req.body.id = count;
    tasks.push(req.body);
    console.log(req.body);
    res.send(req.body);
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});


app.get('/tasks/:tasksId', (req, res) => {
    var idTask = parseInt(req.params.idTask);
    var tas = tasks.findIndex( aux => aux.idTask === idTask);
    res.json(tasks[tas]);
    
});
app.put('/tasks/:taskId', jsonParser, function (req, res) {
  const status = req.query.status;
  var idTask = parseInt(req.params.taskId);
  var tas = [];
    if (status != "") {
        tasks.forEach(function(value,index,array){
            if(value.id==idTask){
                value.title = req.body.title;
                value.detail = req.body.detail;
                value.status = status;
    
            }
        });
        res.send("Se cambio la tarea");

    } else {
        tasks.forEach(function(value,index,array){
            if(value.id==idTask){
                value.title = req.body.title;
                value.detail = req.body.detail;
            }
        });
        res.send("Se cambio la tarea");
    }
});


app.delete('/tasks/:taskId', function (req, res) {
    var idTask = parseInt(req.params.taskId);
    tasks.forEach(function(value,index,array){
        if(value.id==idTask){
            tasks.splice(index,1);
        }
    });
    res.send("Se elimino la tarea");
});


app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});