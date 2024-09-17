import {
    View,
    SafeAreaView,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

import { icons, images } from "../../constants";
import { useGlobalContext } from "../../context";
import { getUserPosts, quitSession, useAppwrite } from "../../lib";
import {
    EmptyState,
    VideoCard,
    LoadingScreen,
} from "../../components";

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const { data: videoPosts, isLoading } = useAppwrite(() =>
        getUserPosts(user.$id ? user.$id : user["_j"].$id)
    );

    const logOut = async () => {
        setIsLoggedIn(false);
        setUser(null);
        await quitSession();
        router.replace("/");
    };

    return (
        <SafeAreaView className="bg-bgprimary h-full">
            <FlatList
                data={videoPosts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) =>
                    !isLoading && <VideoCard loop={false} video={item} />
                }
                ListHeaderComponent={() => (
                    <View className="mt-[4vh]">
                        {isLoading ? (
                            <View className="mt-[30vh]">
                                <LoadingScreen loaderColor={"gold"} />
                            </View>
                        ) : (
                            <View className="w-full">
                                <View className="justify-between flex-row text-center items-center">
                                    <TouchableOpacity
                                        onPress={() => router.push("/home")}
                                    >
                                        <Image
                                            source={images.logo}
                                            className="w-[60px] h-[60px]"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => logOut()}
                                        className="mb-8"
                                    >
                                        <Image
                                            source={icons.logout}
                                            className="w-6 h-6 mt-4 mr-4"
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View className="w-full items-center">
                                    <Image
                                        resizeMode="cover"
                                        className="w-[50px] h-[50px] rounded-lg"
                                        source={{
                                            uri: user
                                                ? user.avatar
                                                    ? user.avatar
                                                    : user["_j"].avatar
                                                : " ",
                                        }}
                                    />
                                    <Text className="text-3xl font-psemibold text-yellow-300 mt-3">
                                        {user
                                            ? user.username
                                                ? user.username
                                                : user["_j"].username
                                            : "Loading..."}
                                    </Text>
                                    <View className=" w-full items-center mt-2 mb-6">
                                        <Text className="text-white font-pbold text-xl">
                                            {videoPosts.length || 0}
                                        </Text>
                                        <Text className="text-white font-pmedium opacity-50">
                                            Posts
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )}
                ListEmptyComponent={() =>
                    !isLoading && (
                        <EmptyState
                            title={`${user.username} is not uploaded any files`}
                            subtitle={`No uploads on yhis page`}
                        />
                    )
                }
            />
        </SafeAreaView>
    );
};

export default Profile;
