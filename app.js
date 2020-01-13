const express=require('express');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/todos', {useNewUrlParser: true});
const db=mongoose.connection;
const app=express();
const routes=express.Router();
const cors=require('cors');
const bodyParser=require('body-parser');
const TSchema=require('./todos.model');


db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
    console.log('we\'re live');
});
app.use(cors());
app.use(bodyParser.json());
app.use('/',routes)
routes.get('/',(req,res)=>{
    TSchema.find((err,todos)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(todos);
        }
    });
});
routes.get('/:id',(req,res)=>{
    let todos=TSchema.findById(req.params.id,(err,todos)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.json(todos);
        }
    })
});

routes.post('/add',(req,res)=>{
    let todos=new TSchema(req.body);
    console.log(req.body);
    todos.save().then(todos=>{
        res.status(200).json({'todos':'add with successfly'});
    }).catch(err=>{
        res.status(400).send('can\'t add this todos');
    })
});

routes.post('/update/:id',(req,res)=>{
    let todos=TSchema.findById(req.params.id,(err,todo)=>{
        if(!todo){
            res.status(404).send('not found !');
        }
        else{
            todo.name=req.body.name;
            todo.description=req.body.description;
            todo.birth=req.params.birth;
            console.log();


            todo.save().then(todo=>{
                res.status(200).send('update with success');
            }).catch(err=>{
                res.status(400).send('error');
            })
        }
    });
});
routes.post('/delete/:id',(req,res)=>{
    let todos=TSchema.deleteOne(req.body.id,(err,todos)=>{
        if(err){
            res.status(404).send('not found');
            console.log(err);
        }
        else{
            res.status(200).send('delete with success');
        }
    });
})




app.listen(3000);