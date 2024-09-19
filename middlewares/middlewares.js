const { default: mongoose } = require("mongoose");
const Tenant = require("../models/tenant");

exports.createDbForTenant = async function (req, res, next){
    try {
        const reqTenant = await Tenant.findOne({ email: req.body.email })
    if (!reqTenant) {
        return res.status(404).json({ msg: "Tenant Doesn't exist" })
    }
    const db = await mongoose.connection.useDb(`tenant_${reqTenant.uuid}`, {
        useCache: true
    }).asPromise();

    if (!db.models['User']) {
        db.model('User', new mongoose.Schema({ email: { type: String, unique: true } }));
    }
    req.db = db
    next()
    } catch (error) {
        return res.status(404).json({ success: false, msg: err.message }); 
    }
    
}


exports.isTenant = async function (req, res, next){
    try {
        const tenantUser = await Tenant.findOne({uuid: req.params.uuid});
        if(!tenantUser){
            return res.status(404).json({ success: false, msg: "tenant doesn't exist" });
        }
        const db = await mongoose.connection.useDb(`tenant_${req.params.uuid}`, {
            useCache: true
        }).asPromise();

        if (!db.models['User']) {
            db.model('User', new mongoose.Schema({ email: { type: String, unique: true } }));
        }

        console.log('Find users from', db.name);
        req.db = db;
        next();
    } catch (error) {
        return res.status(404).json({ success: false, msg: err.message });
    }
}