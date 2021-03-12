
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');





module.exports.createSession =  async function(req,res){
    
    try{
        //find the user
        let user = await User.findOne({email: req.body.email});

        // if user doesnot exist or user password doesnot match
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        //if user password matches and user is also found
        return res.json(200, {
            message: "Sign in successful, here is your token, please keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
            }
        })
    }catch(err){
        console.log('*******', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}