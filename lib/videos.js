import { Query, ID } from "react-native-appwrite";
import { appwriteConfig, databases } from "./appwrite";

import { uploadFile } from "./utils";

const getAllVideoPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        );

        return posts.documents;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getRecomendedPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt", Query.limit(7))]
        );

        return posts.documents;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getSearchedPostsByParam = async (param, query) => {    
    if (!query || !param) return;
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search(param, query)]
        );        

        return posts.documents;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("uploader", userId), Query.orderDesc("$createdAt")]
        );

        return posts.documents;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createVideo = async (form) => {
    try {
        const [videoUrl, thumbnailUrl] = await Promise.all([
            uploadFile(form.video, "video"),
            uploadFile(form.thumbnail, "image"),
        ]);

        const newPost = databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                hashTags: form.hashTags,
                video: videoUrl,
                thumbnail: thumbnailUrl,
                uploader: form.userId,
            }
        );

        return newPost;
    } catch (err) {
        throw new Error(err);
    }
};

export {
    getAllVideoPosts,
    getRecomendedPosts,
    getUserPosts,
    createVideo,
    getSearchedPostsByParam,
};
