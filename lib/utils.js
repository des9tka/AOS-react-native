import { ID } from "react-native-appwrite";

import { storage, appwriteConfig } from "./appwrite";

const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            );
        } else {
            throw new Error("Invalid file type");
        }
    } catch (err) {
        throw new Error();
    }
    return fileUrl;
};

const uploadFile = async (file, type) => {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (err) {
        throw new Error(err);
    }
};

export { getFilePreview, uploadFile };
