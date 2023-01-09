var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email: { type: String },
    mobile: { type: String },
    fname: { type: String },
    Lname: { type: String },
    dob: { type: String },

    avg_step: { type: Number },
    cal: { type: Number },
    sleep: { type: Number },
    daily_goal: { type: Number },
	
    updated_date:{ type: Date, default: Date.now},
	created_date:{ type: Date, default: Date.now},

});

module.exports = mongoose.model('user', userSchema);