import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, type Href } from "expo-router";
import { supabase, supabaseConfigError } from "@/lib/supabase";
import { eventCategories, type Event, type EventCategory } from "@/types/event";

type EventDraft = Omit<Event, "id">;

const emptyDraft = (): EventDraft => ({
  titulli: "",
  data: "",
  ora: "",
  vendi: "",
  kategoria: "Muzikë",
  pershkrimi: "",
});

export default function Index() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<EventDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);

  const loadEvents = useCallback(async () => {
    if (!supabase) {
      setError(supabaseConfigError);
      setEvents([]);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setError(null);
    try {
      const now = new Date();
      const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");
      const { data, error: queryError } = await supabase
        .from("eventet")
        .select("id, titulli, data, ora, vendi, kategoria, pershkrimi")
        .gte("data", today)
        .order("data", { ascending: true });

      if (queryError) {
        setError(`Gabim nga Supabase: ${queryError.message}`);
        setEvents([]);
      } else {
        setEvents(data ?? []);
      }
    } catch (queryError) {
      setError(
        queryError instanceof Error
          ? `Gabim gjatë leximit: ${queryError.message}`
          : "Ndodhi një gabim gjatë leximit të eventeve.",
      );
      setEvents([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    void loadEvents();
  }, [loadEvents]);

  const visibleEvents = selectedCategory
    ? events.filter((event) => event.kategoria === selectedCategory)
    : events;

  const saveEvent = async () => {
    setFormMessage(null);

    if (!supabase) {
      setFormMessage(supabaseConfigError);
      return;
    }

    const event = {
      ...draft,
      titulli: draft.titulli.trim(),
      vendi: draft.vendi.trim(),
      pershkrimi: draft.pershkrimi.trim(),
    };

    if (
      !event.titulli ||
      !event.vendi ||
      !event.pershkrimi ||
      !/^\d{4}-\d{2}-\d{2}$/.test(event.data) ||
      !/^\d{2}:\d{2}$/.test(event.ora)
    ) {
      setFormMessage("Plotëso të gjitha fushat. Datën shkruaje VVVV-MM-DD dhe orën OO:MM.");
      return;
    }

    setSaving(true);
    try {
      const { error: insertError } = await supabase.from("eventet").insert(event);

      if (insertError) {
        setFormMessage(`Nuk u ruajt eventi: ${insertError.message}`);
        return;
      }

      setDraft(emptyDraft());
      setFormMessage("Eventi u ruajt.");
      void loadEvents();
    } catch (insertError) {
      setFormMessage(
        insertError instanceof Error
          ? `Gabim gjatë ruajtjes: ${insertError.message}`
          : "Ndodhi një gabim gjatë ruajtjes së eventit.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={visibleEvents}
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
              <Text style={styles.stateTitle}>
                {events.length > 0 ? "S’ka evente në këtë kategori" : "Ende s’ka evente"}
              </Text>
              <Text style={styles.stateMessage}>
                {events.length > 0
                  ? "Zgjidh një kategori tjetër ose shiko të gjitha eventet."
                  : "Eventet e ardhshme do të shfaqen këtu."}
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
          <Text style={styles.fieldLabel}>Filtro sipas kategorisë</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categories}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: selectedCategory === null }}
                onPress={() => setSelectedCategory(null)}
                style={[
                  styles.categoryOption,
                  selectedCategory === null && styles.selectedCategory,
                ]}
              >
                <Text
                  style={[
                    styles.categoryOptionText,
                    selectedCategory === null && styles.selectedCategoryText,
                  ]}
                >
                  Të gjitha
                </Text>
              </Pressable>
              {eventCategories.map((category) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: selectedCategory === category }}
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryOption,
                    selectedCategory === category && styles.selectedCategory,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      selectedCategory === category && styles.selectedCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      }
      renderItem={({ item }) => (
        <Link href={`/event/${item.id}` as Href} asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Shiko detajet e ${item.titulli}`}
            style={styles.card}
          >
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
            <Text style={styles.detailsLink}>Shiko detajet ›</Text>
          </Pressable>
        </Link>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={
        <View style={styles.form}>
          <Text style={styles.formTitle}>Shto event</Text>
          <Text style={styles.formHint}>
            Për demonstrim. Publikimi i eventeve duhet të kontrollohet para përdorimit real.
          </Text>
          <TextInput
            accessibilityLabel="Titulli i eventit"
            onChangeText={(value) => setDraft((current) => ({ ...current, titulli: value }))}
            placeholder="Titulli i eventit"
            style={styles.input}
            value={draft.titulli}
          />
          <View style={styles.formRow}>
            <TextInput
              accessibilityLabel="Data e eventit"
              onChangeText={(value) => setDraft((current) => ({ ...current, data: value }))}
              placeholder="Data: VVVV-MM-DD"
              style={[styles.input, styles.halfInput]}
              value={draft.data}
            />
            <TextInput
              accessibilityLabel="Ora e eventit"
              onChangeText={(value) => setDraft((current) => ({ ...current, ora: value }))}
              placeholder="Ora: OO:MM"
              style={[styles.input, styles.halfInput]}
              value={draft.ora}
            />
          </View>
          <TextInput
            accessibilityLabel="Vendi i eventit"
            onChangeText={(value) => setDraft((current) => ({ ...current, vendi: value }))}
            placeholder="Vendi"
            style={styles.input}
            value={draft.vendi}
          />
          <Text style={styles.fieldLabel}>Kategoria</Text>
          <View style={styles.categories}>
            {eventCategories.map((category) => (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: draft.kategoria === category }}
                key={category}
                onPress={() => setDraft((current) => ({ ...current, kategoria: category }))}
                style={[
                  styles.categoryOption,
                  draft.kategoria === category && styles.selectedCategory,
                ]}
              >
                <Text
                  style={[
                    styles.categoryOptionText,
                    draft.kategoria === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            accessibilityLabel="Përshkrimi i eventit"
            multiline
            onChangeText={(value) => setDraft((current) => ({ ...current, pershkrimi: value }))}
            placeholder="Përshkrimi"
            style={[styles.input, styles.descriptionInput]}
            value={draft.pershkrimi}
          />
          {formMessage ? (
            <Text accessibilityLiveRegion="polite" style={styles.formMessage}>
              {formMessage}
            </Text>
          ) : null}
          <Pressable
            accessibilityRole="button"
            disabled={saving}
            onPress={() => void saveEvent()}
            style={[styles.saveButton, saving && styles.disabledButton]}
          >
            <Text style={styles.saveText}>{saving ? "Duke ruajtur…" : "Ruaj eventin"}</Text>
          </Pressable>
        </View>
      }
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
  form: { gap: 12, marginTop: 24, padding: 18, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0" },
  formTitle: { color: "#0f172a", fontSize: 21, fontWeight: "800" },
  formHint: { color: "#64748b", fontSize: 13, lineHeight: 19 },
  input: { minHeight: 48, paddingHorizontal: 13, paddingVertical: 11, borderRadius: 10, borderWidth: 1, borderColor: "#cbd5e1", color: "#0f172a", backgroundColor: "#fff", fontSize: 15 },
  formRow: { flexDirection: "row", gap: 10 },
  halfInput: { flex: 1, minWidth: 0 },
  fieldLabel: { color: "#334155", fontSize: 14, fontWeight: "700" },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  categoryOption: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 999, backgroundColor: "#f1f5f9" },
  selectedCategory: { backgroundColor: "#1d4ed8" },
  categoryOptionText: { color: "#334155", fontSize: 13, fontWeight: "600" },
  selectedCategoryText: { color: "#fff" },
  detailsLink: { color: "#1d4ed8", fontSize: 14, fontWeight: "700", marginTop: 2 },
  descriptionInput: { minHeight: 88, textAlignVertical: "top" },
  formMessage: { color: "#b91c1c", fontSize: 14, lineHeight: 20 },
  saveButton: { alignItems: "center", paddingVertical: 14, borderRadius: 10, backgroundColor: "#1d4ed8" },
  disabledButton: { opacity: 0.6 },
  saveText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
