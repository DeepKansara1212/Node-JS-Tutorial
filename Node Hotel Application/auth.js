const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const Person = require('./models/person');

// Sets up a passport with a local authentication strategy, using a Person model for use 
passport.use(new LocalStrategy(async (Username, Password, done) => {
    // Authentication Logic here
    try {
        // console.log('Received Credentials:', Username, Password
        const user = await Person.findOne({username: Username})
        if(!user) {
            return done(null, false, { message: 'Incorrect Username' })
        }

        // const isPasswordMatch = user.password === Password ? true : false
        const isPasswordMatch = await user.comparePassword(Password) 
        
        if(isPasswordMatch) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Incorrect Password' })
        } 

    } catch(err) {
        return done(err)
    }
})) 

module.exports = passport