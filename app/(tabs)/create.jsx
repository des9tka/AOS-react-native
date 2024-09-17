import { useState } from "react";
import {
    ScrollView,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";

import { icons, images } from "../../constants";
import { createVideo } from "../../lib";
import { useGlobalContext } from "../../context";
import { CustomFormField, CustomButton, CustomAlert } from "../../components";

const Create = () => {
    const [uploading, setUploading] = useState(false);
    const [alert, setAlert] = useState(false);
    const { user } = useGlobalContext();

    const [form, setForm] = useState({
        title: "",
        video: "",
        thumbnail: "",
        hashTags: "",
    });

    const openPicker = async (uploadType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type:
                uploadType === "image"
                    ? ["image/png", "image/jpeg"]
                    : ["video/mp4", "video/gif", "video/wav"],
        });

        if (!result.canceled) {
            if (uploadType === "image") {
                setForm({ ...form, thumbnail: result.assets[0] });
            }

            if (uploadType === "video") {
                setForm({ ...form, video: result.assets[0] });
            }
        }
    };

    const submit = async () => {
        if (!form.video || !form.thumbnail || !form.hashTags || !form.title) {
            setAlert(true);
            return;
        }
        setUploading(true);

        try {
            await createVideo({ ...form, userId: user.$id });
            Alert.alert(`Success`, `Upload is succesfull`);
            router.push("/home");
        } catch (err) {
            Alert.alert("Error: " + err.message);
        } finally {
            setForm({
                title: "",
                video: "",
                thumbnail: "",
                hashTags: "",
            });

            setUploading(false);
        }
    };

    return (
        <SafeAreaView className="bg-bgprimary h-full w-full">
            <ScrollView className="m-4">
                {alert && (
                    <View className="absolute w-full h-full z-10 justify-center items-center">
                        <CustomAlert
                            buttonText={"Cancle"}
                            title={"Uploading Error"}
                            subTitle={"Please fill all fields"}
                            handleOnClick={() => setAlert(false)}
                        />
                    </View>
                )}

                <View className="flex-row items-center">
                    <Image
                        source={images.logo}
                        className="w-14 h-14 mt-4 mr-2"
                    />
                    <Text className="text-yellow-300 text-3xl font-medium">
                        Upload Video Form
                    </Text>
                </View>

                <CustomFormField
                    title={"Video Title"}
                    titleStyles={"text-white text-sm font-pmedium mb-1"}
                    wrapperStyles={"mt-10"}
                    formStyles={
                        "bg-gray-800 w-full rounded-md h-[50px] border border-gray-700 font-psemibold pl-4 text-white"
                    }
                    value={form.title}
                    handleChangeText={(e) => setForm({ ...form, title: e })}
                    placeholder={"Give your video a virus title..."}
                />

                <View className="mt-10 mb-6">
                    <Text className="text-white text-sm font-pmedium mb-1">
                        Upload video
                    </Text>
                    <TouchableOpacity onPress={() => openPicker("video")}>
                        {form.video ? (
                            <Video
                                source={{ uri: form.video.uri }}
                                className="w-full h-64 rounded-2xl"
                                useNativeControls
                                resizeMode={ResizeMode.COVER}
                                isLooping={true}
                            />
                        ) : (
                            <View className="w-full bg-gray-800 h-40 px-4 rounded-2xl border border-gray-700 flex justify-center items-center">
                                <View className="w-14 h-14 border border-dashed border-yellow-300 flex justify-center items-center">
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        alt="upload"
                                        className="w-1/2 h-1/2"
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="mb-6">
                    <Text className="text-white text-sm font-pmedium mb-1">
                        Upload video thumbnail
                    </Text>
                    <TouchableOpacity onPress={() => openPicker("image")}>
                        {form.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail.uri }}
                                className="w-full h-64 rounded-2xl"
                                resizeMode={ResizeMode.COVER}
                            />
                        ) : (
                            <View className="w-full bg-gray-800 h-15 px-4 rounded-md border border-gray-700 flex justify-center items-center">
                                <View className="w-24 h-10 justify-center items-center flex-row content-center">
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        alt="upload"
                                        className="w-2/5 h-2/5"
                                    />
                                    <Text className="text-white font-psemibold">
                                        Choose a file
                                    </Text>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View>
                    <CustomFormField
                        title={"Video Tags"}
                        titleStyles={"text-white text-sm font-pmedium mb-1"}
                        wrapperStyles={""}
                        formStyles={
                            "bg-gray-800 w-full rounded-md h-[50px] border border-gray-700 font-psemibold pl-4 text-white"
                        }
                        value={form.hashTags}
                        handleChangeText={(e) =>
                            setForm({ ...form, hashTags: e })
                        }
                        placeholder={"Write #tags for your video..."}
                    />
                </View>

                <View className="w-full first-letter:items-center">
                    <CustomButton
                        title={"Submit & Publish"}
                        handleOnClick={() => submit()}
                        buttonStyles={
                            "bg-yellow-500 mt-6 h-12 rounded-lg w-3/4 justify-center"
                        }
                        textStyles={"text-center font-psemibold"}
                        isLoading={uploading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;
