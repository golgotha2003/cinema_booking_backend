import User from "../models/user";

// Admin service contains functions for admin to manage users
class AdminService {
    /**
     * Get all users except password
     */
    getAllUsers = async () => {
        const users = await User.find().select("-password");

        return users;
    }

    /**
     * Toggle user status
     * @param email User email
     * @param isLocked User status
     */
    toggleUserStatus = async (email: string, isLocked: boolean) => {
        const user = await User.findOne({email});

        if(!user) throw new Error("User not found");

        user.is_locked = isLocked;

        await user.save();

        return isLocked ? "Locked" : "Unlocked";
    }
}
export default new AdminService();