import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export const ViewWorkout = () => {
  const [result, setResult] = useState({});
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
  return <Text>{JSON.stringify(result, null, 2)}</Text>;
};
