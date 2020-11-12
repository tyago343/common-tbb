import passport from "passport";
import passportLocal from "passport-local";
import bCrypt from "bcrypt";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User;
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const isValidPassword = function (userpass: string, password: string) {
      return bCrypt.compareSync(password, userpass);
    };
    User.findOne({
      where: {
        email: email,
      },
    })
      .then(function (user: any) {
        if (!user) {
          return done(null, false, {
            message: "Email does not exist",
          });
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }

        return done(null, user);
      })
      .catch(function (err: any) {
        console.log("Error:", err);

        return done(null, false, {
          message: "Something went wrong with your Signin",
        });
      });
  })
);

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */
