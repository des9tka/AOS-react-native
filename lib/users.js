import { Query } from "react-native-appwrite";

import { account, databases, appwriteConfig } from "./appwrite";

const getCurrentUser = async () => {
    try {
        const currenAccount = await account.get();

        if (!currenAccount) throw new Error("No account.");

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currenAccount.$id)]
        );

        if (!currentUser) throw new Error("No user.");

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { getCurrentUser };
