import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { Link, type Href } from "expo-router";
import { artikujt } from "@/data/artikujt";

function KomponentiIm() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Komponenti im</Text>
      <Text>Ky është komponenti im i parë!</Text>
    </View>
  );
}

export default function Index() {
  let numriMeLet = 0;
  const [numri, setNumri] = useState(0);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.container}
      data={artikujt}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.heading}>Projekti im</Text>
          <KomponentiIm />

          <View style={styles.section}>
            <Text style={styles.subtitle}>Prova me let</Text>
            <Text>Numri: {numriMeLet}</Text>
            <Button
              title="Rrit numrin me let"
              onPress={() => {
                numriMeLet += 1;
                console.log("Numri me let:", numriMeLet);
              }}
            />
            <Text style={styles.note}>
              Numri nuk ndryshon në ekran, sepse let nuk e rifreskon ekranin.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Prova me useState</Text>
            <Text>Numri: {numri}</Text>
            <Button
              title="Rrit numrin me useState"
              onPress={() => setNumri((n) => n + 1)}
            />
            <Text style={styles.note}>
              Ky numër ndryshon në ekran kur shtyp butonin.
            </Text>
          </View>

          <Text style={styles.subtitle}>Pesë artikujt</Text>
          <Text style={styles.note}>Prek një artikull për të parë detajet.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Link href={`/artikull/${item.id}` as Href} style={styles.row}>
          <Text style={styles.itemTitle}>{item.titulli}</Text>
          <Text style={styles.arrow}>›</Text>
        </Link>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  container: { padding: 20, paddingBottom: 40, gap: 18 },
  header: { gap: 18 },
  heading: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  card: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    gap: 6,
  },
  cardTitle: { fontSize: 20, fontWeight: "bold" },
  section: { gap: 10 },
  subtitle: { fontSize: 18, fontWeight: "600" },
  note: { color: "#555" },
  row: {
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: { fontSize: 16, color: "#0f172a" },
  arrow: { fontSize: 24, color: "#64748b" },
  separator: { height: 10 },
});
