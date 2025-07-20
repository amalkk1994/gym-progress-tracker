import React, { useEffect, useState } from "react";
import { Text, ScrollView, SafeAreaView } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { ExerciseCard } from "./ExerciseCard";

export const ViewWorkout = () => {
  const [result, setResult] = useState([]);
  const db = useSQLiteContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRows = await db.getAllAsync("SELECT * FROM workouts");
        setResult(allRows);
        for (const row of allRows) {
          console.log(row.id, row.muscleGroup, row.exercise, row.weight);
        }
      } catch (err) {
      } finally {
      }
    };

    fetchData();
  }, []); // Emp
  return (
    <ScrollView>
      {result.map((item) => (
        <ExerciseCard
          key={item.id}
          id={item.id}
          date={item.date}
          exercise={item.exercise}
          muscleGroup={item.muscleGroup}
          setNo={item.setNo}
          reps={item.setNo}
          weight={item.weight}
        />
      ))}
    </ScrollView>
  );
};
