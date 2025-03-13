import User from "../models/User";
import generateTokenAndSetCookie from "../util/generateToken";


export const signup = async(req , res)=>{

    try{
        const {name,
            adresse,
             number,
            password,
            } = req.body

const find = await User.findOne({number})

if(find){
    return res.status(409).json({error : "User already exists"})
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const NewUser = new User({ name, 
    adresse, 
    number, 
    password: hashedPassword  })

await NewUser.save()
const token =generateTokenAndSetCookie(NewUser._id.toString(),res)
res.status(200).json({
	_id: NewUser._id,
    fullname: NewUser.name,
				username: NewUser.adresse,
                token: token 
})
    }
    catch(error){
        console.error('Signup error:', error);
    
        res.status(500).json({ error: "this" }) }
}








export const login = async(req , res)=>{

    try {
    const {name , number , password} = req.body
    
    const newuser =await User.findOne({number})

    if(!newuser){
        return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, newuser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = generateTokenAndSetCookie(newuser._id, res )
    
    res.status(200).json({
        _id: newuser._id,
        fullname: newuser.name,  
        username: newuser.adresse,  
        profilePic: newuser.profilePic || null,  
        token: token,
    })
    
    }
    catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "error"}) 
    }
    
    
    
    }
    


