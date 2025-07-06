import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { WorkoutForm } from "./components/WorkoutForm";
import { SQLiteProvider } from "expo-sqlite";

export default function App() {
  return (
    <SQLiteProvider
      databaseName="userDatabase.db"
      onInit={async (db) => {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE,
        muscleGroup TEXT NOT NULL,
        exercise TEXT NOT NULL,
        weight TEXT NOT NULL,
        setNumber TEXT NOT NULL,
        reps TEXT NOT NULL
      );
      PRAGMA journal_mode=WAL;
      `);
      }}
      options={{ useNewConnection: false }}
    >
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <WorkoutForm />
    </SQLiteProvider>
  );
}
