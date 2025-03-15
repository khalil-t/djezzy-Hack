
import Donation from "../models/Donation";

export const CreatDonation = async(req, res)=>{

try{
    const { num, type, quantity, description } = req.body;
const userId= req.user.id

if (!num || !type || !quantity) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  const validTypes = ["Person", "Food", "Material"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid donation type." });
  }

  const donation = new Donation({
    user: userId,
    num, type, quantity, description
  });


await donation.save()

  res.status(201).json({ success: true, message: "Donation created successfully!", donation });

}
    catch (error) {
        console.error("Error :", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      } 
}

export const GetAllDonations = async(req, res)=>{

try{
const donations = await Donation.find()    .populate("user", "name") 
.populate("event", "name") 
.select("-__v")

res.status(200).json({
    success: true,
    message: "Donations retrieved successfully.",
    data: donations
  });
}
    catch (error) {
        console.error("Error :", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }    
}


