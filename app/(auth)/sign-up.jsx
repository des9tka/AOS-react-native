import { useState } from "react";
import { View, ScrollView, Text, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import { createUser } from "../../lib/";
import { useGlobalContext } from "../../context";
import { CustomFormField, CustomButton } from "../../components";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [showRepietPassword, setShowrepietPassword] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submitData = async () => {
        if (
            !form.username ||
            !form.email ||
            !form.password1 ||
            form.password1 !== form.password2
        ) {
            setSubmitError(true);
            setShowrepietPassword(false);
        } else {
            try {
                const result = await createUser(
                    form.email,
                    form.password2,
                    form.username
                );

                setUser(result);
                setIsLoggedIn(true);

                router.replace("/home");
            } catch (error) {
                Alert.alert(`Error: ${error.message}`);
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

                    <View className="flex-row mt-[15vh] justify-center">
                        <Image source={images.logo} className="w-16 h-16 m-1" />

                        <Text className="font-black text-7xl m-1 text-yellow-300">
                            AOS
                        </Text>

                        <View>
                            <Text className="text-yellow-300 justify-center border rounded-md p-1 border-yellow-400">
                                Join Us
                            </Text>
                        </View>
                    </View>

                    <CustomFormField
                        title={"User Name"}
                        value={form.username}
                        handleChangeText={(e) => {
                            setSubmitError(false);

                            setForm({
                                ...form,
                                username: e,
                            });
                        }}
                        wrapperStyles="m-2 mt-5"
                        titleStyles="text-xl font-psemibold text-center text-yellow-300"
                        formStyles="w-full text-xl text-center text-white h-12 border-white focus:border-yellow-300 p-2 rounded-md border bg-slate-900"
                    />

                    <CustomFormField
                        title={"Email"}
                        value={form.email}
                        handleChangeText={(e) => {
                            setSubmitError(false);
                            setForm({
                                ...form,
                                email: e,
                            });
                        }}
                        wrapperStyles="m-2 mt-5"
                        titleStyles="text-xl font-psemibold text-center text-yellow-300"
                        formStyles="w-full text-xl text-center text-white h-12 border-white focus:border-yellow-300 p-2 rounded-md border bg-slate-900"
                    />

                    {!showRepietPassword && (
                        <CustomFormField
                            title={"Password"}
                            value={form.password1}
                            secure={true}
                            handleChangeText={(e) => {
                                setSubmitError(false);

                                setForm({
                                    ...form,
                                    password1: e,
                                });
                            }}
                            wrapperStyles="m-2 mt-5 mb-6"
                            titleStyles="text-xl font-psemibold text-center text-yellow-300"
                            formStyles="w-full text-xl text-center text-white h-12 border-white focus:border-yellow-300 p-2 rounded-md border bg-slate-900"
                        />
                    )}

                    {showRepietPassword && (
                        <CustomFormField
                            title={"Confirm Password"}
                            value={form.password2}
                            secure={true}
                            handleChangeText={(e) => {
                                setSubmitError(false);

                                setForm({
                                    ...form,
                                    password2: e,
                                });
                            }}
                            wrapperStyles="m-2 mt-5 mb-6"
                            titleStyles="text-xl font-psemibold text-center text-yellow-300"
                            formStyles="w-full text-xl text-center text-white h-12 border-white focus:border-yellow-300 p-2 rounded-md border bg-slate-900"
                        />
                    )}

                    <View className="w-full flex-row justify-center">
                        {showRepietPassword && (
                            <CustomButton
                                title={"Sign Up"}
                                textStyles={"text-center pt-1 font-psemibold"}
                                handleOnClick={submitData}
                                buttonStyles={`font-pregular border rounded-lg p-1 m-2 w-1/4 bg-yellow-300`}
                            />
                        )}

                        {!showRepietPassword && (
                            <CustomButton
                                title={"Confirm Password"}
                                textStyles={"text-center pt-1 font-psemibold"}
                                handleOnClick={() =>
                                    setShowrepietPassword(true)
                                }
                                buttonStyles={`font-pregular border rounded-lg p-1 m-2 w-2/4 bg-yellow-300`}
                            />
                        )}
                    </View>

                    <View>
                        {!form.username && submitError && (
                            <Text className="text-base text-red-500 text-center">
                                ❌ Username is required!
                            </Text>
                        )}
                        {!form.email && submitError && (
                            <Text className="text-base text-red-500 text-center">
                                ❌ Email is required!
                            </Text>
                        )}
                        {!form.password1 && submitError && (
                            <Text className="text-base text-red-500 text-center">
                                ❌ Password is required!
                            </Text>
                        )}
                        {form.password1 !== form.password2 && submitError && (
                            <Text className="text-base text-red-500 text-center">
                                ❌ Password are not the same!
                            </Text>
                        )}
                    </View>

                    <Text className="text-center text-white mt-2">
                        Already have an account?
                        <Link className="text-yellow-300" href={"/sign-in"}>
                            {` Sign In`}
                        </Link>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
