import { StyleSheet, Text, View } from "react-native";

export default function KomponentiIm() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Komponenti im</Text>
      <Text>Ky është komponenti im i parë!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    gap: 6,
  },
  title: { fontSize: 20, fontWeight: "bold" },
});
