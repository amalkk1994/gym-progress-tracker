import { WorkoutForm } from "./components/WorkoutForm";
import { SQLiteProvider } from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ViewWorkout } from "./components/ViewWorkout";

const Stack = createNativeStackNavigator();

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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AddWorkout"
            component={WorkoutForm}
            options={{ title: "Add Workout" }}
          />
          <Stack.Screen name="ViewWorkout" component={ViewWorkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
