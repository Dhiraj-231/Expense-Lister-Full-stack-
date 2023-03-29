import pkg from "passport-jwt";
import User from "../models/user.js";
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Dhashu";
export default (passport) => {
  passport.use(new JwtStrategy(opts,async(jwt_payload,done)=>{
     const user= await User.findOne({id: jwt_payload.sub});
     try {
        if(user){
            return done(null,user)
        } else{
            return done(null,false)
        }
     } catch (error) {
        return done(error,false)
     }
  }))
};
