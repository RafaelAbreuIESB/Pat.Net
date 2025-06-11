import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, View, Text } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import { ThemeProvider } from './ThemeContext'; // Importando o ThemeProvider

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider> {/* Envolvendo o app com o ThemeProvider */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#b5f7cd",
              borderBottomWidth: 1,
              borderBottomColor: "#000",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <Image
                source={require("./assets/logoBranco.png")}
                style={{ width: 60, height: 60, marginRight: 1, marginLeft: -10 }}
                resizeMode="contain"
              />
            ),
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Pat.Net" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
