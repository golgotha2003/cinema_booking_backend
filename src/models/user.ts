import mongoose, { CallbackError, Schema } from "mongoose";
import { IUser, IUserModel } from "../interfaces/iUser";
import { Role } from "../utils/user/role.enum";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>({
    avatar: {
        type: String,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    is_active: {
        type: Boolean,
        default: false
    },
    is_locked: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
});

UserSchema.pre<IUser>("save", async function(next) {
    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);

        next();
    }
    catch(error){
        next(error as CallbackError);
    }
});

UserSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Invalid email or password");
        
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        throw new Error("Invalid email or password");
    }
    return user;
}

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;