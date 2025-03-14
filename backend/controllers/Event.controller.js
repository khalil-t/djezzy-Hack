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


