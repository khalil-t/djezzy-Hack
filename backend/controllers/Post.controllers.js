import Post from "../models/Post";
import Comment from "../models/Comment";


export const CreatPost= async(req, res)=>{
try{
const{title, content, image}= req.body

if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
}

const userId = req.user._id;


const newPost = await Post.create({
    title, content,  image: image || "",  createdBy: userId,
})

const savedPost= newPost.save()

res.status(201).send(savedPost);

}
catch(error){
    console.error('Signup error:', error);

    res.status(500).json({ error: "this" }) }
}



