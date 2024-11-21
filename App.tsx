import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SolarSystem from "./src/screens/SolarSystem";
import PlanetDetails from "./src/screens/PlanetDetails";
import AddPlanet from "./src/screens/AddPlanet";

export interface Planet {
  id: number;
  name: string;
  description: string;
  image: string;
  moons: number;
  moon_names: string[];
}

export type RootStackParamList = {
  SolarSystem: { refresh?: boolean };
  PlanetDetails: { planet: Planet };
  AddPlanet: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SolarSystem"
          component={SolarSystem}
          options={{ title: "Solar System" }}
        />
        <Stack.Screen
          name="PlanetDetails"
          component={PlanetDetails}
          options={{ title: "Planet Details" }}
        />
        <Stack.Screen
          name="AddPlanet"
          component={AddPlanet}
          options={{ title: "Add Planet" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
