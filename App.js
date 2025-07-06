import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WorkoutForm } from "./components/WorkoutForm";

export default function App() {
  return (
    <>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <WorkoutForm />
    </>
  );
}
