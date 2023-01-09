const User = require('../model/customer');
const Cust_Health = require('../model/cust_health_data');
var nodemailer = require('nodemailer');
var cron = require('node-cron');
const moment = require('moment')


exports.register = async (req, res) => {

    const { dob, fname, Lname, email, mobile, step, cal, sleep, daily_goal } = req.body;
    userdata = new User()
    userdata.Lname = Lname;
    userdata.fname = fname;
    userdata.email = email;
    userdata.dob = dob;
    userdata.mobile = mobile;

    await userdata.save();
    return res.status(200).json({ status: true, message: "Successfully Registered. " });
}



exports.create_steps = async (req, res) => {
    let d = moment().format("DD-MM-YYYY");
    const { val, type, user_id } = req.body;
    let user = await Cust_Health.findOne({ user_id, date: d, type: "steps" })
    if (user) {
        console.log("user value", user.val)
        await Cust_Health.updateOne({ user_id }, {
            val: Number(user.val) + Number(val),
            updated_date:Date.now()
        });

    } else {
        cust_h_data = new Cust_Health()
        cust_h_data.type = type;
        cust_h_data.val = val;
        cust_h_data.user_id = user_id;
        cust_h_data.date = moment('2023-01-09T17:02:56.296+00:00').format("DD-MM-YYYY")

        await cust_h_data.save();
    }

    //updating usermodel
    let user_cust = await Cust_Health.findOne({ user_id, date: d, type: "steps" })
    if(user_cust){
        await User.updateOne({ _id:user_id}, {
            avg_step: Number(user_cust.val),
            updated_date:Date.now()
        });
    }
    

    return res.status(200).json({ status: true, message: "Successfully added steps. " });
}
//appricarion email
cron.schedule('0 0 * * *', async () => {

    let query = db.collection.aggregate([
        {
            "$group": {
                "_id": "$step",

                "total_steps": { "$sum": 1 }
            }
        }
    ])

    if (query.length > 0) {

        for (let i = 0; i < query.length; i++) {

            if (query[i].total_steps > 5000) {

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.email,
                        pass: process.env.password
                    }
                });
                const mailOptions = {
                    from: 'sender@email.com', // sender address
                    to: 'to@email.com', // list of receivers
                    subject: 'appricarion email', // Subject line
                    html: '<p>congs... you have compleated 5000 steps</p>'// plain text body
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log(info);
                });

            }

        }

    }

});
