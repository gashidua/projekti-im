import { useCallback, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { supabase, supabaseConfigError } from "@/lib/supabase";
import type { Event } from "@/types/event";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvent = useCallback(async () => {
    if (!supabase) {
      setError(supabaseConfigError);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: queryError } = await supabase
        .from("eventet")
        .select("id, titulli, data, ora, vendi, kategoria, pershkrimi")
        .eq("id", id)
        .maybeSingle();

      if (queryError) {
        setError(`Gabim nga Supabase: ${queryError.message}`);
        setEvent(null);
      } else if (!data) {
        setError("Ky event nuk u gjet.");
        setEvent(null);
      } else {
        setEvent(data);
      }
    } catch (queryError) {
      setError(
        queryError instanceof Error
          ? `Gabim gjatë leximit: ${queryError.message}`
          : "Ndodhi një gabim gjatë leximit të eventit.",
      );
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadEvent();
  }, [loadEvent]);

  return (
    <View style={styles.screen}>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹ Kthehu te eventet</Text>
      </Pressable>
      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator size="large" color="#1d4ed8" />
          <Text style={styles.body}>Duke ngarkuar detajet…</Text>
        </View>
      ) : error ? (
        <View style={styles.state}>
          <Text style={styles.title}>Detajet nuk u hapën</Text>
          <Text selectable style={styles.body}>{error}</Text>
          <Pressable accessibilityRole="button" onPress={() => void loadEvent()} style={styles.retry}>
            <Text style={styles.retryText}>Provo përsëri</Text>
          </Pressable>
        </View>
      ) : event ? (
        <View style={styles.card}>
          <Text style={styles.category}>{event.kategoria}</Text>
          <Text style={styles.title}>{event.titulli}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.body}>
              {new Date(`${event.data}T00:00:00`).toLocaleDateString("sq-XK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Ora</Text>
            <Text style={styles.body}>{event.ora.slice(0, 5)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Vendi</Text>
            <Text style={styles.body}>{event.vendi}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Përshkrimi</Text>
            <Text style={styles.body}>{event.pershkrimi}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, gap: 16, padding: 20, backgroundColor: "#f8fafc" },
  back: { alignSelf: "flex-start", paddingVertical: 8 },
  backText: { color: "#1d4ed8", fontSize: 15, fontWeight: "700" },
  state: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 20 },
  card: { gap: 20, padding: 20, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0" },
  category: { color: "#1d4ed8", fontSize: 14, fontWeight: "700" },
  title: { color: "#0f172a", fontSize: 26, fontWeight: "800" },
  detailRow: { gap: 5 },
  label: { color: "#64748b", fontSize: 13, fontWeight: "700" },
  body: { color: "#334155", fontSize: 16, lineHeight: 24 },
  retry: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: 10, backgroundColor: "#1d4ed8" },
  retryText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
