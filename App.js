import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import ApartmentScreen from "./src/screens/ApartmentsScreen/ApartmentScreen";
import Profile from "./src/screens/ProfileScreens/Profile";
import HolderProfile from "./src/screens/ProfileScreens/HolderProfile";

// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Apartment: ApartmentScreen,
//     MyProfile: Profile,
//     HolderProfile: HolderProfile
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       headerShown:false
//     },
//   }
// );
const App = () => {
  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={HomeScreen} options={{}} />
        <Stack.Screen name={"Apartment"} component={ApartmentScreen} options={{}}/>
        <Stack.Screen name={"MyProfile"} component={Profile} options={{}}/>
        <Stack.Screen name={"HolderProfile"} component={HolderProfile} options={{}}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
};
export default App;
