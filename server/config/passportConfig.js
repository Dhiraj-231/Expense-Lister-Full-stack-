import pkg from "passport-jwt"
import user from "../models/user";
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Love you anshu';
export default (passport) => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        user.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}