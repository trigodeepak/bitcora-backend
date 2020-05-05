import * as mongoose from 'mongoose';
import { strict } from 'assert';

export let Schema = mongoose.Schema;

let post = new Schema({},{strict:false});
let user = new Schema({},{strict:false});
let comment = new Schema({},{strict:false});

export let postSchema = mongoose.model('posts', post);
export let userSchema = mongoose.model('users', user);
export let commentSchema = mongoose.model('comments',comment);