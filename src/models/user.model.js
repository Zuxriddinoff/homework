import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
    },
    role: {
        type: String,
        enum: ['student', 'superadmin', 'admin', 'teacher'],
        default: 'student',
    },
}, {
    timestamps: true
});


const User = model('User', userSchema);
export default User;