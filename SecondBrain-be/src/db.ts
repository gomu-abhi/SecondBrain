import mongoose from 'mongoose';
const { Schema } = mongoose;
const Types = Schema.Types;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
});

const contentTypes = ['Video', 'Tweet', 'Document', 'InstaPost']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: String}],
  userId: { type: Types.ObjectId, ref: 'users', required: true },
});

const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true},
});

const UserModel = mongoose.model('users', userSchema);
const ContentModel = mongoose.model('content', contentSchema);
const TagModel = mongoose.model('tags', tagSchema);
const LinkModel = mongoose.model('links', linkSchema);

// ✅ Use named exports
export {
  UserModel,
  ContentModel,
  TagModel,
  LinkModel
};