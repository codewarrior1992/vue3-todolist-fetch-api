const router = require('express').Router();
const Todo = require('../models/Todo.js')

router.post('/create', async(req,res)=>{
    const data = req.body;
    const todo = new Todo(data);
    const saveTodo = await todo.save();

    res.send({
        success : true,
        message : '新增成功',
        todo : saveTodo,
    })
})

router.get('/all', async(req,res)=>{
    const list = await Todo.find({});
    res.send({
        success : true,
        message : '取得待辦列表',
        list
    })
})

router.get('/get-one', async(req,res)=>{
    const todo = await Todo.findById({_id : req.query._id});
    res.send({
        success : true,
        message : '取得待辦事項',
        todo
    })
})

router.patch('/update', async(req,res)=>{
    const { title , _id } = req.body
    const todo = await Todo.findByIdAndUpdate(
        { _id },        
        { $set : { title }},
        { new : true }
    )
    res.send({
        success : true,
        message : '已更新待辦事項',
        todo
    })
})

router.post('/delete', async(req,res)=>{
    const todo = await Todo.findByIdAndDelete({_id : req.body._id})
    res.send({
        success : true,
        message : '已刪除待辦事項',
        todo
    })
})

router.patch('/checked', async(req,res)=>{
    const { completed , _id} = req.body;
    
    const todo = await Todo.findByIdAndUpdate({_id}, { $set : { completed }}, { new : true })
    
    res.send({
        success : true,
        message : '已更新狀態',
        todo
    })
})

module.exports = router