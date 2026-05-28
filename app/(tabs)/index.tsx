import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const colors = [
  "#FF6B6B",
  "#6BCB77",
  "#4D96FF",
  "#FFD93D",
  "#C77DFF",
  "#FF9A3C",
];

export default function Index() {
  const [colorIndex, setColorIndex] = useState(0);

  const changeColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <View style={styles.container}>
      {/* Card */}
      <View style={[styles.card, { backgroundColor: colors[colorIndex] }]}>
        <Text style={styles.cardText}>Hello! I am a Card 🎨</Text>
        <Text style={styles.cardSubText}>
          Press the button to change my color!
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={changeColor}>
        <Text style={styles.buttonText}>Change Color</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 300,
    height: 200,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 40,
    padding: 20,
  },
  cardText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  cardSubText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
