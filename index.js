const express = require('express');
const bodyParser = require('body-parser');
// const itemRoutes = require('./routes/itemRoutes');

const mongodb = require('mongodb');
const {ObjectId} = require('mongodb')
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
// app.use('/items', itemRoutes);
const url = 'mongodb+srv://amit_singh:kya_hal_hai_tere@cluster0.jpqo2bq.mongodb.net';

class User{
    constructor(name,email,number){
        this.name = name;
        this.email = email;
        this.number = number;
    }
    
}

app.post("/create",async(req,res)=>{
    const client = await mongodb.MongoClient.connect(url);
    try{
        const db = client.db('MYDATABASE');
        const collection = db.collection('users'); 
        // let data = req.body
        const {name,email,number} = req.body;
        const user = new User(name,email,number);
        console.log("user data",user)
        let storeData = await collection.insertOne(user);
        console.log("store data",storeData);
        await client.close();
       return res.status(201).send({msg:"data created",data:storeData})
}catch(err){
    console.log(err);
}
});

app.get("/all", async(req,res)=>{
    const client = await mongodb.MongoClient.connect(url);
    try{
        const db = client.db('MYDATABASE');
        const collection = db.collection('users'); 
        let storeData = await collection.find({}).toArray();
        console.log("store data",storeData);
        await client.close();
        return res.status(200).send({msg:"data created",data:storeData})
}catch(err){
    console.log(err);
}
});

app.get("/getdatabyId/:id", async(req,res)=>{
    const client = await mongodb.MongoClient.connect(url);
    try{
        let userId = req.params;
        console.log("userid",userId)
        const db = client.db('MYDATABASE');
        const collection = db.collection('users'); 
        let storeData = await collection.findOne({_id: new ObjectId(userId)})
        console.log("store data",storeData);
        await client.close();
        return res.status(200).send({msg:"data created",data:storeData})
}catch(err){
    console.log(err);
}
});

app.patch("/updatedatabyId/:id", async(req,res)=>{
    const client = await mongodb.MongoClient.connect(url);
    try{
        let userId = req.params;
        console.log("userid",userId)
        let updateData = req.body;
        console.log("updated data",updateData)
        const db = client.db('MYDATABASE');
        const collection = db.collection('users'); 
        let storeData = await collection.findOneAndUpdate({_id: new ObjectId(userId)},{$set:updateData},{returnDocument:'after'});
        console.log("store data",storeData);
        await client.close();
        return res.status(200).send({msg:"data created",data:storeData})
}catch(err){
    console.log(err);
}
});

app.delete("/deletedatabyId/:id", async(req,res)=>{
    const client = await mongodb.MongoClient.connect(url);
    try{
        let userId = req.params;
        console.log("userid",userId)
        const db = client.db('MYDATABASE');
        const collection = db.collection('users'); 
        let storeData = await collection.deleteOne({_id:new ObjectId(userId)})
        console.log("store data",storeData);
        await client.close();
        return res.status(200).send({msg:"data created",data:storeData})
}catch(err){
    console.log(err);
}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});