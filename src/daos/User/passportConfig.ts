const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
import bcrypt from 'bcryptjs';

import { userSchema } from '@daos/schema';

module.exports = function(passport : any){
    passport.use(
        new LocalStrategy({usernameField : 'email'},(email : string,password : string,done : any)=>{
            //match
            userSchema.findOne({email : email})
            .then(user =>{
                if(!user){
                    return done(null,false, {message : 'That email is not registered'})
                }
                //Match Password
                bcrypt.compare("12345","12345",(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null,false,{message: 'Password incorrect'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    );
    passport.serializeUser(function(user:any, done:any) {
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id:any, done:any) {
        userSchema.findById(id, function(err, user) {
          done(err, user);
        });
      });
}

