import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ExerciseCard = ({
  id,
  date,
  exercise,
  muscleGroup,
  setNo,
  reps,
  weight,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{exercise}</Text>
      <Text style={styles.date}>{date}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Muscle Group:</Text>
        <Text style={styles.value}>{muscleGroup}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Set No:</Text>
        <Text style={styles.value}>{setNo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Reps:</Text>
        <Text style={styles.value}>{reps}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{weight} kg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginVertical: 2,
  },
  label: {
    fontWeight: "600",
    width: 110,
    color: "#555",
  },
  value: {
    color: "#333",
  },
});
