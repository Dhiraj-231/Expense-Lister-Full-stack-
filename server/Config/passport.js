import pkg from "passport-jwt";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
export default (passport) => {
  passport.use(new JwtStrategy(opts,async(jwt_payload,done)=>{
     const user= await User.findById({_id: jwt_payload._id});
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
