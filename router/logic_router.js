const express=require("express")
const router = express.Router()
const { register, create_steps } = require("../controller/logic");


router.post("/register",register);
router.post("/create_steps",create_steps);
module.exports=router;