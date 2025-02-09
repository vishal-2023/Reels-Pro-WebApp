import {Schema,model,models} from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser{
    email:string,
    password:string,
    createdAt:Date,
    updatedAt:Date,
}

const userSchema = new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

userSchema.pre('save',async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next()
})

const User = models?.User || model<IUser>('User',userSchema)

export default User;
