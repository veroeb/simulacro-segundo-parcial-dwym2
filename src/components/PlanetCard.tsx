import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Planet } from "../../App";

interface PlanetCardProps {
  planet: Planet;
  onPress: () => void;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: planet.image }} style={styles.image} />
      <Text style={styles.name}>{planet.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "#222",
    borderRadius: 10,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PlanetCard;
