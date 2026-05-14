import { Platform, ScrollView, Text, StyleSheet} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Riceflix</Text>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Running on: {Platform.OS}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center"
  }
})