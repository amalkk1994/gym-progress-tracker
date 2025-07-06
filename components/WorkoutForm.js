// components/WorkoutForm.js
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";

const muscleGroups = [
  "Chest",
  "Triceps",
  "Back",
  "Biceps",
  "Shoulders",
  "Abs",
  "Legs",
  "HIIT",
];

export function WorkoutForm() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [setNumber, setSetNumber] = useState("");
  const [result, setResult] = useState({});

  const db = useSQLiteContext();

  const handleSave = async () => {
    const entry = {
      date: date.toISOString().slice(0, 10),
      muscleGroup,
      exercise,
      weight,
      reps,
      setNumber,
    };
    console.log("Saved Entry:", entry);

    setResult((prev) => ({ ...prev, ...entry }));
    console.log("result", result);

    try {
      if (!muscleGroup || !exercise || !reps || !setNumber) {
        throw new Error("All fields are rquired");
      }

      await db.runAsync(
        "INSERT INTO workouts (date, muscleGroup, exercise, weight, reps, setNumber) VALUES (?,?,?,?,?,?)",
        [
          date.toISOString().slice(0, 10),
          muscleGroup,
          exercise,
          weight,
          reps,
          setNumber,
        ]
      );

      Alert.alert("success", `${muscleGroup} workout added successfully!`);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.messsage || "An error occured while adding the user."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Date</Text>
      <Button
        title={date.toDateString()}
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Muscle Group</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={muscleGroup}
          onValueChange={(value) => setMuscleGroup(value)}
        >
          <Picker.Item label="Select" value="" />
          {muscleGroups.map((group) => (
            <Picker.Item key={group} label={group} value={group} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Exercise</Text>
      <TextInput
        style={styles.input}
        value={exercise}
        onChangeText={(value) => {
          setExercise(value);
        }}
        placeholder="e.g., Squat"
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={(value) => setWeight(value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Reps</Text>
      <TextInput
        style={styles.input}
        value={reps}
        onChangeText={(value) => setReps(value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>SetNumber</Text>
      <TextInput
        style={styles.input}
        value={setNumber}
        onChangeText={(value) => setSetNumber(value)}
        keyboardType="numeric"
      />
      <View style={{ marginVertical: 25 }}>
        <Button title="Add" onPress={handleSave} />
      </View>

      <View style={styles.resultContainer}>
        <Text>{JSON.stringify(result, null, 2)}</Text>
        <Text>{date.toISOString().slice(0, 10)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 4,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 4,
  },
  resultContainer: {
    marginTop: 4,
  },
});
