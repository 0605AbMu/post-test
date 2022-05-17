const { Router, json } = require("express");
const post = Router();
const posts = require("../controllers/posts")


const postScheme = require("../schema/postSchema");

post.use((req, res, next) => {
    if (req.isAdmin == undefined) {
        return next();
    } else {
        return res.status(403).json({ message: "Siz administrator emassiz!" });
    }
})


post.get("/getAll", async (req, res)=>{
try {
    const result = await posts.getAll();
    res.status(200).json(result);

} catch (error) {
    res.status(501).json({message: "Serverda xatolik mavjud!"});
}

})


post.post("/add", async (req, res) => {
    if (req.body == undefined || Object.keys(req.body).length == 0) return res.status(400).json({ message: "Ma'lumotlar berilmadi" });
    const result = postScheme.addPostSchema.validate(req.body)
    if (result.error) {
        return res.status(400).json({ message: result.error.message});
    };

    try {
        const added = await posts.addOne(req.body);
        console.log("added", added)
        if (added.insertedId) {
            req.body._id = added.insertedId;
            return res.status(200).json(req.body);
        } else {
            return res.status(501).json({ message: "DataBase ishlashida xatolik mavjud" });
            
        }

    } catch (error) {
        res.status(501).json({ message: "DataBase ishlashida xatolik mavjud" });
        console.log(error)
    }

});

post.put("/update", async (req, res) => {
    if (req.body == undefined || Object.keys(req.body).length == 0) return res.status(400).json({ message: "Ma'lumotlar berilmadi" });
    const { _id, ...updatableData } = req.body;
    if (_id == undefined) res.status(400).json({ message: "ID raqam berilmadi!" });
    const result = postScheme.updatePostSchema.validate(updatableData)
    if (result.error) {

        return res.status(400).json({ message: result.error.message});
    };

    try {

        const updated = await posts.updateById(_id, updatableData);
        if (updated.matchedCount != 0) {
            return res.status(200).json(await posts.getById(_id));
        } else {
            return res.status(400).json({ message: "BU ID ga ega post topilmadi!" })
        }
    } catch (error) {
        res.status(501).json({ message: "DataBase ishlashida xatolik mavjud" });
    }

});





module.exports = post;