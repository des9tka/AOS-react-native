import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { Image } from "react-native";

import { icons } from "../../constants";

const TabBarIcon = ({ icon, name, color, focused }) => {
    return (
        <View className='justify-center items-center'>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-pblack' : 'font-semibold'} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#ffd100",
                    tabBarInactiveTintColor: "#475569",
                    tabBarActiveBackgroundColor: "#0f152a",
                    tabBarInactiveBackgroundColor: "#0f152a",
                    tabBarStyle: {
                        height: 55,
                        borderTopWidth: 0
                    },
                
                }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                icon={icons.home}
                                name={"Home"}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                icon={icons.plus}
                                name={"Create"}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                icon={icons.profile}
                                name={"Profile"}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;

const styles = StyleSheet.create({});
