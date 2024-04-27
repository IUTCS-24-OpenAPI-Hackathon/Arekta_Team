import mongoose from 'mongoose';
import { IAttraction } from '../interfaces/attraction.interface';

const userSchema = new mongoose.Schema<IAttraction>(
  {
   image:{
    type:String
   },
   description:{
    type:String
   },
   review:{
    type:String
   },
   comment:{
    type:String
   },
   experience:{
    type:String
   },
   owner:{
    type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   }
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
