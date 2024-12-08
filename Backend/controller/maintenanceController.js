const Maintenance = require("../models/maintenaceModel")

//check password correction in maintenance
exports.CheckMaintenancePassword = async (req, res) => {
    try {
       
        const { password } = req.body;

        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        
        const isPasswordCorrect = await compare(password, req.user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password verified successfully"
        });

    } catch (error) {
        console.error("Error during password verification:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
//add maintenance
exports.CreateMaintenance= async (req,res)=>{
    try {
        const {maintenanceAmount,penaltyAmount,dueDate,penaltyDay}=req.body;
        if(!maintenanceAmount || !penaltyAmount || !dueDate || !penaltyDay){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const maintenance= new Maintenance({
            maintenanceAmount,
            penaltyAmount,
            dueDate,
            penaltyDay
        })
        await maintenance.save();
        
        if(!maintenance){
            return res.status(400).json({
                success:false,
                message:"Soemthing went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Maintenance Successfully Added"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}
//get maintenance
exports.GetMaintenance =async (req,res)=>{
    try {
        const  maintenance= await Maintenance.find()
        return res.status(200).json({
          success: true,
          Maintenance: maintenance,
        });
      } catch (error) {

        return res.status(500).json({
          success: false,
          message: "Error fetching Maintenance",
        });
      }
}