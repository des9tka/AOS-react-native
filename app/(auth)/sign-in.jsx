import { useState } from "react";
import { View, ScrollView, Text, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import { getCurrentUser, signIn } from "../../lib";
import { CustomFormField, CustomButton } from "../../components";
import { useGlobalContext } from "../../context";

const SighIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submitData = async () => {
        if (!form.email || !form.password) {
            Alert.alert(
                "Can`t sign in your account, check your email and password."
            );
        } else {
            try {
                await signIn(form.email, form.password);
                const response = getCurrentUser();

                let result = response;

                setUser(result);
                setIsLoggedIn(true);

                router.replace("/home");
            } catch (err) {
                Alert.alert(`Error: ${err.message}`);
            }
        }
    };

    return (
        <SafeAreaView className="h-full bg-bgprimary">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="flex h-full w-full">
                    <Image
                        source={images.authBackground}
                        className="w-full h-full absolute inset-0 object-cover z-0"
                    />

                    <View className="flex-row mt-[20vh] justify-center">
                        <Image source={images.logo} className="w-16 h-16 m-1" />

                        <Text className="font-black text-7xl m-1 text-yellow-300">
                            AOS
                        </Text>

                        <View>
                            <Text className="text-yellow-300 justify-center border rounded-md p-1 border-yellow-400">
                                Get in
                            </Text>
                        </View>
                    </View>

                    <CustomFormField
                        title={"Email"}
                        value={form.email}
                        handleChangeText={(e) =>
                            setForm({
                                ...form,
                                email: e,
                            })
                        }
                        wrapperStyles="m-2 mt-5"
                        titleStyles="text-xl font-psemibold text-center text-yellow-300"
                        formStyles="w-full text-xl text-center text-white h-12 border-white focus:border-yellow-300 p-2 rounded-md border bg-slate-900"
                    />
                    <CustomFormField
                        title={"Password"}
                        value={form.password}
                        secure={true}
                        handleChangeText={(e) =>
                            setForm({
                                ...form,
                                password: e,
                            })
                        }
                        wrapperStyles="m-2 ml-[2vw]"
                        titleStyles="text-xl font-psemibold text-center text-yellow-300"
                        formStyles="w-full text-xl text-center text-white h-12 border-white focus:border-yellow-300 p-2 rounded-md border bg-slate-900"
                    />

                    <View className="w-full flex-row justify-center">
                        <CustomButton
                            title={"Sign In"}
                            textStyles={"text-center font-psemibold pt-1"}
                            handleOnClick={submitData}
                            buttonStyles={`border rounded-lg p-1 m-2 w-1/4 bg-yellow-300`}
                        />
                    </View>
                    <Text className="text-center text-white mt-2">
                        Don`t have an account?
                        <Link className="text-yellow-300" href={"/sign-up"}>
                            {` Sign Up`}
                        </Link>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SighIn;
