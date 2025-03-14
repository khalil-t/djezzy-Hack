import Post from "../models/Post";
import Comment from "../models/Comment";
import Post from "../models/Post";


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


 res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
}
catch (error) {
    console.error("Create Post error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
}

export const GetAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = req.query;

        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const sortOrder = order === "asc" ? 1 : -1;

        const skip = (pageNumber - 1) * pageSize;

        const posts = await Post.find()
            .sort({ [sortBy]: sortOrder }) 
            .skip(skip) 
            .limit(pageSize); 

        const totalPosts = await Post.countDocuments();

        res.status(200).json({
            totalPosts,
            totalPages: Math.ceil(totalPosts / pageSize),
            currentPage: pageNumber,
            pageSize,
            posts,
        });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};





