import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type AddPlanetProps = NativeStackScreenProps<RootStackParamList, "AddPlanet">;

const AddPlanet: React.FC<AddPlanetProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.21:8000/planets")
      .then((response) => response.json())
      .then((data) => setPlanets(data))
      .catch((error) => console.error("Error fetching planets:", error));
  }, []);

  const getNextId = (): number => {
    const numericIds = planets
      .map((planet: any) => parseInt(planet.id, 10))
      .filter((id) => !isNaN(id));
    return numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
  };

  const handleAdd = () => {
    const defaultImage =
      "https://t4.ftcdn.net/jpg/02/77/98/67/360_F_277986727_L2PWXsvn1LOyBYGYu2AJ0nABo5eQtFV4.jpg";
    const newId = getNextId();

    fetch("http://192.168.1.21:8000/planets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newId,
        name,
        description,
        image: image || defaultImage,
        moons: 0,
        moon_names: [],
      }),
    })
      .then(() => navigation.navigate("SolarSystem", { refresh: true }))
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <Button title="Add Planet" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#000",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddPlanet;
