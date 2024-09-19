const Tenant = require("../models/tenant");
const { v4 } = require("uuid");



exports.userLogin = async function (req, res) {
    try {
        const db = req.db;
        const user = await db.model('User').find({ email: req.body.email });

        if (user.length === 0) {
            const newUser = await db.model('User').create({ email: req.body.email });
            console.log("user registered");
            return res.status(201).json({ success: true, msg: "user created", newUser });
        } else {
            return res.status(200).json({ success: true, msg: "user already exists", user });
        }
    } catch (err) {
        console.log("user email error", err);
        return res.status(404).json({ success: false, msg: err.message });
    }
}



exports.tenantRegister = async function (req, res) {
    try {
        const email = req.body.email;
        const tenant = await Tenant.findOne({ email })
        console.log("tenant", tenant)
        if (tenant) {
            return res.json({ msg: "tenant exist already", tenant })
        }
        const newTenant = await Tenant.create({ email, uuid: v4() })
        res.status(200).json({ success: true, newTenant })

    } catch (error) {
        return res.status(404).json({ success: false, msg: err.message });
    }
}


exports.tenantLogin = async function (req, res) {
    try {
        const email = req.body.email;
        const tenant = await Tenant.findOne({ email })
        if (!tenant) {
            return res.send("sign up first")
        }
        const encodeUser = {
            email: tenant.email,
            uuid: tenant.uuid
        }
        console.log(encodeUser)
        return res.status(200).json({ success: true, user: encodeUser, msg: "you are logged in" })
    } catch (error) {
        return res.status(404).json({ success: false, msg: error.message });
    }
}

exports.tenantUsers = async function (req, res) {
    try {
        const db = req.db;
        const users = await db.model('User').find();
        return res.status(200).json({ success: true, msg: "all users", users });
    } catch (error) {
        return res.status(404).json({ success: false, msg: error.message });
    }
}