import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import PlanetCard from "../components/PlanetCard";
import { RootStackParamList, Planet } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type SolarSystemProps = NativeStackScreenProps<
  RootStackParamList,
  "SolarSystem"
>;

const SolarSystem: React.FC<SolarSystemProps> = ({ navigation }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("default");

  const fetchPlanets = () => {
    fetch("http://192.168.1.21:8000/planets")
      .then((response) => response.json())
      .then((data) => setPlanets(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const handleSort = (order: string) => {
    setSortOrder(order);
    if (order === "moons") {
      setPlanets([...planets].sort((a, b) => b.moons - a.moons));
    } else {
      fetchPlanets();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 20, margin: 20 }}>Sort by:</Text>
      <View style={styles.containerPicker}>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue) => handleSort(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Default Order" value="default" />
          <Picker.Item label="Sort by Moons" value="moons" />
        </Picker>
      </View>

      <FlatList
        data={planets}
        renderItem={({ item }) => (
          <PlanetCard
            planet={item}
            onPress={() =>
              navigation.navigate("PlanetDetails", { planet: item })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <TouchableOpacity
        style={[
          styles.addButton,
          Platform.OS === "ios" ? styles.iosButton : styles.androidButton,
        ]}
        onPress={() => navigation.navigate("AddPlanet")}
      >
        <Text style={styles.addButtonText}>
          {Platform.OS === "ios" ? "Crear Planeta" : "Nuevo Planeta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  containerPicker: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    marginHorizontal: "5%",
    backgroundColor: "#333",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 20,
  },

  picker: {
    width: "100%",
    color: "#fff",
  },
  pickerItem: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    alignSelf: "center",
  },
  iosButton: {
    backgroundColor: "green",
  },
  androidButton: {
    backgroundColor: "blue",
  },
  addButtonText: {
    color: Platform.OS === "ios" ? "#000" : "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SolarSystem;
