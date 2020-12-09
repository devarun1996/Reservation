const express = require("express");
const router = express.Router();
const Owners = require("./ownerModel");
const Reservations = require("./reserveModel");
const {ownerRegister, ownerLogin, authenticateToken} = require("./auth");

// register owner
router.post("/register", async (req, res)=>{
    try{

        await ownerRegister(req.body, res);
    }
    catch (err) {
        res.status(400).json({          //400 - fault in client side
            message: err.message
        })
    }
});

//login owner
router.post("/login", async (req, res) =>{

    try{

        await ownerLogin(req.body, res);

    }catch(err){
        res.status(400).json({
            message: err.message
        });
    }
});

// get all owners
router.get("/owner", authenticateToken, async (req, res)=>{
   
    try{
        const ownerData = await Owners.find();
        res.json(ownerData);
    }catch(err){
        res.status(500).json({message: err.message}) 
    }
})

// get an owner by id-- no use in front-end
router.get("/owner/:id", authenticateToken, async (req, res)=>{
    
    try{
        const ownerData = await Owners.findById(req.params.id);
        if(ownerData == null)
        {
            return res.status(404).json({
                message: "Can not find user data"
            })
        }
        res.json(ownerData);
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//delete an owner -- no use in front-end
router.delete("/owner/:ownerId", authenticateToken, async (req, res)=>{
    try{
        await Owners.findOneAndRemove({
            _id: req.params.ownerId
        })
        res.json({
            message: "Data deleted!"
        })  

    } catch (err) {
        res.status(500).json({                  //500 - fault in server side
            message: err.message
        })
    }   

})

// create a reservation for a restaurant
router.post("/owner/:ownerId/reservation", authenticateToken, async (req, res)=>{
    try{
        const temp = new Reservations({
            name: req.body.name,
            people: req.body.people, 
            time: req.body.time,
            ownerId: req.params.ownerId    //takes id from parameter
        })
        const newReserve = await temp.save();
        res.status(201).json(newReserve);

    }
    catch (err) {
        res.status(400).json({          //400 - fault in client side
            message: err.message
        })
    }

});

// get all reservations of a restaurant
router.get("/owner/:ownerId/reservation", authenticateToken, async (req, res)=>{
    try{
        const ownerReserve = await Reservations.find({ownerId: req.params.ownerId});
        res.json(ownerReserve);
    }catch(err){
        res.status(500).json({message: err.message})
    }

})

// get a particular reservation of a restaurant 
router.get("/owner/:ownerId/reservation/:reservationId", authenticateToken, async (req, res)=>{
    try{
        const reserve = await Reservations.findById({
            _id: req.params.reservationId,
            ownerId: req.params.ownerId
        })
        res.json(reserve);
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
});

// edit a particular reservation of a restaurant
router.patch("/owner/:ownerId/reservation/:reservationId", authenticateToken, async (req, res)=>{
    try{
        await Reservations.findByIdAndUpdate({
            _id: req.params.reservationId,
            ownerId: req.params.ownerId
        },
        {
            $set: req.body
        })
        
        //res.sendStatus(200).json({      //---->HttpClient “Http failure during parsing” in front-end
        //  message: "Updated!",
        //  success: true
        //});  
        res.send("Updated.."); // alternate solution as can't send nothing as result for subscribe to run...

    }
    catch (err) {
        res.status(400).json({          //400 - fault in client side
            message: err.message
        })
    }

});

//delete a reservation of a restaurant
router.delete("/owner/:ownerId/reservation/:reservationId", authenticateToken, async (req, res)=>{
    try{
        await Reservations.findOneAndRemove({
            _id: req.params.reservationId,
            ownerId: req.params.ownerId
        })
        res.json({
            message: "Data deleted!"
        })  

    } catch (err) {
        res.status(500).json({                  //500 - fault in server side
            message: err.message
        })
    }

})

module.exports = router;