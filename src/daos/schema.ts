import * as mongoose from 'mongoose';
import { strict } from 'assert';

export let Schema = mongoose.Schema;

const post = new Schema({},{strict:false});
const user = new Schema({},{strict:false});
const comment = new Schema({},{strict:false});
const like = new Schema({},{strict:false});


export let postSchema = mongoose.model('posts', post);
export let userSchema = mongoose.model('users', user);
export let commentSchema = mongoose.model('comments',comment);
export let likeSchema = mongoose.model('likes',like);