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








