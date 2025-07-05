// components/WorkoutForm.js
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
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

export default function WorkoutForm() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const handleSave = () => {
    const entry = {
      date: date.toDateString(),
      muscleGroup,
      exercise,
      weight,
      reps,
      sets,
    };
    console.log("Saved Entry:", entry);
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
        onChangeText={setExercise}
        placeholder="e.g., Squat"
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Reps</Text>
      <TextInput
        style={styles.input}
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sets</Text>
      <TextInput
        style={styles.input}
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
      />

      <Button title="Save" onPress={handleSave} />
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
});
