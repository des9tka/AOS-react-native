import {
    Client,
    Account,
    ID,
    Avatars,
    Databases,
    Query,
    Storage,
} from "react-native-appwrite";

import { avatars, account, databases, appwriteConfig } from "./appwrite"


const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw new Error();
        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to register user");
    }
};

const signIn = async (email, password) => {
    try {
        if (account.getSession()) {
            await account.deleteSession("current");
        }
    } catch (error) {}
    const session = await account.createEmailPasswordSession(email, password);
    return session;
};

const quitSession = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {}
};

export { createUser, signIn, quitSession };
