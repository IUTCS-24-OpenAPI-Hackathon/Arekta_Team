import { ObjectId } from 'mongoose';

export interface IAttraction {
    image: string,
    description: string,
    review: string,
    comment: string,
    experience: string,
    owner: { type: ObjectId; ref: string }; 
}