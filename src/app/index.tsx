import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    gap: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    gap: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  note: {
    color: "#555",
  },
});