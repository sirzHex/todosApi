const router = require('express').Router();
const Todo = require('./todos.model');

// get all todos
router.get('/', (req, res) => {
    Todo.find().then(todos => {
        res.json({
            success: true,
            todos: todos
        })
    }).catch(err => {
        res.json({
            success: false,
            error: err
        })
    })
});

// get single todo
router.get('/:id', (req, res) => {
    Todo.findById(req.params.id).then(todo => {
        res.json({
            success: true,
            todo: todo
        })
    }).catch(err => {
        res.json({
            success: false,
            error: err
        })
    })
});

// store todo
router.post('/', (req, res) => {
    Todo.create(req.body).then(todo => {
        res.json({
            success: true,
            todo: todo
        })
    }).catch(err => {
        res.json({
            success: false,
            error: err
        })
    })
});

// update todo
router.patch('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id,req.body, { new: true }, (err, todo) => {
        if (err) return res.json({ success: false, error: err });
        res.json({
            success: true,
            todo: todo
        })
    })
});

// delete tood
router.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, (err, todo) => {
        if (err) return res.json({ success: false, error: err });
        res.json({
            success: true,
            todo: todo
        })
    })
});

module.exports = router