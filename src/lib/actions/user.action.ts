import { IUser } from "@/types/user.type";
import { connect } from "../mongodb/mongoose";
import User from "../models/user.model";

export const createOrUpdateUser = async ({
    id,
    first_name,
    last_name,
    image_url,
    email_addresses
}: IUser) => {
    try {
        await connect()
        const user = await User.findOneAndUpdate(
            { clerkId: id }, {
            $set: {
                firstName: first_name,
                lastName: last_name,
                profilePicture: image_url,
                email: email_addresses[0].email_address,
            }
        }, {
            new: true,
            upsert: true
        })
        return user

    }
    catch (error) {
        console.error("Error creating or updating user:", error);
        throw new Error("Failed to create or update user");
    }
}

export const deleteUser = ({ id }: { id: string }) => {
    try {
        connect()
        return User.findOneAndDelete({ clerkId: id })
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
}