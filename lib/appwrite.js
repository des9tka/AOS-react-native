import {
    Client,
    Account,
    Avatars,
    Databases,
    Storage,
} from "react-native-appwrite";

const appwriteConfig = {
    endpoint: process.env.endpoint,
    platform: process.env.platform,
    projectId: process.env.projectId,
    databaseId: process.env.databaseId,
    userCollectionId: process.env.userCollectionId,
    videoCollectionId: process.env.videoCollectionId,
    storageId: process.env.storageId,
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { account, avatars, databases, storage, appwriteConfig };
