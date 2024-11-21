import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { API_URL } from "@env";

type AddPlanetProps = NativeStackScreenProps<RootStackParamList, "AddPlanet">;

const AddPlanet: React.FC<AddPlanetProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [moonsInput, setMoonsInput] = useState("");

  const handleAdd = () => {
    const defaultImage =
      "https://t4.ftcdn.net/jpg/02/77/98/67/360_F_277986727_L2PWXsvn1LOyBYGYu2AJ0nABo5eQtFV4.jpg";

    const moonNames = moonsInput.split(",").map((moon) => moon.trim());

    fetch(`${API_URL}/planets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        image: image || defaultImage,
        moons: moonNames.length,
        moon_names: moonNames,
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
      <TextInput
        placeholder="Moons (separated by commas)"
        value={moonsInput}
        onChangeText={setMoonsInput}
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
