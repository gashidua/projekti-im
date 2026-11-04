import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase, supabaseConfigError } from "@/lib/supabase";

type Event = {
  id: number;
  titulli: string;
  data: string;
  ora: string;
  vendi: string;
  kategoria: string;
  pershkrimi: string;
};

export default function Index() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    if (!supabase) {
      setError(supabaseConfigError);
      setEvents([]);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setError(null);
    const { data, error: queryError } = await supabase
      .from("eventet")
      .select("id, titulli, data, ora, vendi, kategoria, pershkrimi")
      .order("data", { ascending: true });

    if (queryError) {
      setError(queryError.message);
      setEvents([]);
    } else {
      setEvents(data ?? []);
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    void loadEvents();
  }, [loadEvents]);

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={events}
      keyExtractor={(event) => String(event.id)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      ListEmptyComponent={
        <View style={styles.stateCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#1d4ed8" />
          ) : error ? (
            <>
              <Text style={styles.stateTitle}>Nuk u lexuan eventet</Text>
              <Text selectable style={styles.stateMessage}>
                {error}
              </Text>
              <Pressable accessibilityRole="button" onPress={refresh} style={styles.retryButton}>
                <Text style={styles.retryText}>Provo përsëri</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.stateTitle}>Ende s’ka evente</Text>
              <Text style={styles.stateMessage}>
                Eventet e ardhshme do të shfaqen këtu.
              </Text>
            </>
          )}
        </View>
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.eyebrow}>MITROVICË</Text>
          <Text style={styles.title}>Eventet e ardhshme</Text>
          <Text style={styles.subtitle}>
            Gjej muzikë, teatër, ceremoni, lojëra dhe sport në qytet.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.category}>{item.kategoria}</Text>
            <Text style={styles.date}>
              {new Date(`${item.data}T00:00:00`).toLocaleDateString("sq-XK", {
                day: "numeric",
                month: "long",
              })}
            </Text>
          </View>
          <Text style={styles.eventTitle}>{item.titulli}</Text>
          <Text style={styles.meta}>
            {item.ora.slice(0, 5)} · {item.vendi}
          </Text>
          <Text style={styles.description}>{item.pershkrimi}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, padding: 20, paddingBottom: 36, backgroundColor: "#f8fafc" },
  header: { gap: 8, paddingTop: 24, paddingBottom: 20 },
  eyebrow: { color: "#2563eb", fontSize: 12, fontWeight: "800", letterSpacing: 1.5 },
  title: { color: "#0f172a", fontSize: 30, fontWeight: "800" },
  subtitle: { color: "#475569", fontSize: 16, lineHeight: 23 },
  card: { gap: 9, padding: 18, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0" },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  category: { color: "#1d4ed8", fontSize: 13, fontWeight: "700" },
  date: { color: "#334155", fontSize: 13, fontWeight: "600" },
  eventTitle: { color: "#0f172a", fontSize: 20, fontWeight: "700" },
  meta: { color: "#475569", fontSize: 14 },
  description: { color: "#334155", fontSize: 15, lineHeight: 22 },
  separator: { height: 12 },
  stateCard: { flex: 1, minHeight: 190, alignItems: "center", justifyContent: "center", gap: 12, padding: 20, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0" },
  stateTitle: { color: "#0f172a", fontSize: 18, fontWeight: "700", textAlign: "center" },
  stateMessage: { color: "#475569", fontSize: 14, lineHeight: 20, textAlign: "center" },
  retryButton: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: 10, backgroundColor: "#1d4ed8" },
  retryText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
