const jwt = require("jsonwebtoken")

const encodeToken = (payload) => {
   const token = jwt.sign(payload, "secret")
   return token 
}

const printDecodedToken = () => {
    try {
        const token = encodeToken({user:1, name: "piyush"});
        const decode = jwt.verify(token, "secret")
        console.log(decode)
    } catch (error) {
        console.log(error)
    }
}

printDecodedToken()