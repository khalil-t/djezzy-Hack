import Event from "../models/Event.js";
import Event from "../models/Event.js"


export const CreateEvent = async(req, res)=>{
try{
    const {
        user,
        name,
        description,
        type,
        location,
        pictures,
        startDate,
        endDate,
        duration,
        collaborators,
        requirements
      } = req.body;


      if (!user || !name || !description || !type || !location || !startDate || !endDate) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }


      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
  
      if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid date format" });
      }


      const event = new Event({
        user,
        name,
        description,
        type,
        location,
        pictures,
        startDate,
        endDate,
        duration,
        collaborators,
        requirements
      });

    

      await event.save();

      res.status(201).json({ success: true, event });

}
catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}


}

export const GetAllEvents = async(req, res)=>{

try{

    let { page = 1, limit = 10, sortBy = "startDate", order = "asc" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const sortOrder = order === "desc" ? -1 : 1;

    const totalEvents = await Event.countDocuments();

    const events = await Event.find()
    .sort({ [sortBy]: sortOrder }) 
    .skip((page - 1) * limit) 
    .limit(limit);


    res.status(200).json({
        success: true,
        page,
        totalPages: Math.ceil(totalEvents / limit),
        totalEvents,
        events,
      });
}
catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}

}

export const GetSingleEvent= async(req, res)=>{
try{
    const {id} = req.params
    if (!id) {
        return res.status(400).json({ error: "Event ID is required" });
      }

    const FindEvent = await Event.findById(id)

    if(!FindEvent){
        return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(FindEvent)

}
catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}

}

export const UpdateEvent = async(req,res)=>{

 try{
    const {id} = req.params
    const event = await Event.findById(id);

    if(!event){
        return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (event.user.toString() !== req.user.id) {
        return res.status(403).json({ success: false, message: "Access denied. You are not the event organizer." });
      }

      const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });

      res.status(200).json({ success: true, event: updatedEvent });
 }   
 catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}
}

export const DeleteEvent= async(req, res)=>{
try{
    const {id} = req.params
    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
      }


    if (event.user.toString() !== req.user.id) {
        return res.status(403).json({ success: false, message: "Access denied. You are not the event organizer." });
      }

      const deleteEvent = await Event.findByIdAndDelete(id)

      res.status(200).json({ success: true, message: "Event deleted successfully" });

}
catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}

}

export const joinEvent = async(req, res)=>{
try{
const {id} =req.params
const userId = req.user.id;


const event = await Event.findById(id);
if (!event) {
  return res.status(404).json({ success: false, message: "Event not found" });
}


if (event.attendees && event.attendees.includes(userId)) {
    return res.status(400).json({ success: false, message: "You are already registered for this event" });
  }

    event.attendees = event.attendees || []; 
    event.attendees.push(userId);

await event.save(); 

res.status(200).json({ success: true, message: "Successfully registered for the event", event });

}
catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}


}

export const SearchEvent= async(req , res)=>{
try {
const {q}= req.query

if(!q){
    return res.status(400).json({ success: false, message: "Please provide a search keyword." });
}

const regex = new RegExp(q, "i");

const events = await Event.find({
  $or: [{ name: regex }, { description: regex }],
});

if(events.length === 0){

return res.status(404).json({success: false , message: "No matching events found." })
}

res.status(200).json({ success: true, events });

}
    catch (error) {
        console.error("error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

