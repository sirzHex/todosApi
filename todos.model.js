const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Schema
let todosSchema=new Schema({
    _id:{type:String},
    name:{type:String},
    description:{type:String},
    birth:{type:Date}
});
module.exports=mongoose.model('todos',todosSchema);