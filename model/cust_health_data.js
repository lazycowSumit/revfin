var mongoose = require('mongoose');
var cust_hel= new mongoose.Schema({
   
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
  
    type: { type: String },
    val: { type: Number },
   
    date:{ type: String },
	
	updated_date:{ type: Date, default: Date.now  },
    created_date:{ type: Date, default: Date.now  },
    
});

module.exports = mongoose.model('cust_hel_data', cust_hel);