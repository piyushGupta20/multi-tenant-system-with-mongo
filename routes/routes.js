const express = require("express");
const { userLogin, tenantRegister, tenantUsers, tenantLogin } = require("../controllers/controllers");
const { isTenant, createDbForTenant } = require("../middlewares/middlewares");
const router = express.Router()

//users
router.post('/users/:uuid', isTenant, userLogin);

//register tenant
router.post("/tenant/register", tenantRegister)
router.post("/tenant/login", tenantLogin)
router.get("/tenant/users", createDbForTenant, tenantUsers)


module.exports = router