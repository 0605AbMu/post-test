const { MongoClient, ObjectId, GridFSBucket } = require("mongodb");


const { add } = require("nodemon/lib/rules");

const client = new MongoClient("mongodb://127.0.0.1:27017");

client.connect()
    .then(res => {
        console.log("Postlar bazasi ulandi...");
    })
.catch(e=>{
    console.log("Postlar bazasi ulanmadi.\nError: ", e);
    throw new Error(e);
});

const posts = client.db("test").collection("posts");



async function addOne(data){
    return (await posts.insertOne(data))
};

async function getAll(){
return (await posts.find().toArray());
}

async function updateById(id, data){
return await posts.updateOne({_id: new ObjectId(id)}, {$set: data});
};

async function deleteById(id){
    return await posts.deleteOne({_id: new ObjectId(id)});

};

async function getById(_id){
return await posts.find({_id: new ObjectId(_id)});
}




const postImages = client.db("postImages");
const postImagesBucket = new GridFSBucket(postImages, {bucketName:"images"});













module.exports = {
    addOne: addOne,
    getAll: getAll,
    updateById: updateById,
    deleteById: deleteById,
    getById: getById
}