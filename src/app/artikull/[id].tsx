import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { gjeArtikullin } from "@/data/artikujt";

export default function Detajet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const artikulli = gjeArtikullin(id);

  if (!artikulli) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Artikulli “{id}” nuk u gjet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: artikulli.titulli }} />
      <Text style={styles.title}>{artikulli.titulli}</Text>
      <Text style={styles.description}>{artikulli.pershkrimi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 14 },
  title: { fontSize: 24, fontWeight: "bold" },
  description: { fontSize: 17, lineHeight: 25, color: "#475569" },
});
