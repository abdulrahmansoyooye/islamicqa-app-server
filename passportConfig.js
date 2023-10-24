import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcrypt";
import { User } from "./models/User.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) done(null, false, { message: "Incorrect username" });

        const hashedPassword = bcrypt.compare(password, user.password);

        if (!hashedPassword)
          done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
