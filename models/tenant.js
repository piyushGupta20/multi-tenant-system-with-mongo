const mongoose = require("mongoose")

const tenantSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }, 
    uuid : {
        type: String,
        unique: true
    }
})

const Tenant = mongoose.model('Tenant', tenantSchema)
module.exports = Tenant