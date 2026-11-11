import { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import type { User } from "@supabase/supabase-js";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { supabase, supabaseConfigError } from "@/lib/supabase";

export default function Hyrja() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) setMessage("Nuk u lexua hyrja. Provo përsëri.");
      setUser(data.session?.user ?? null);
    }).catch(() => { if (active) setMessage("Kontrollo lidhjen me internetin."); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  async function authenticate(register: boolean) {
    if (!supabase || busy) return;
    if (!email.trim() || !password) {
      setMessage("Shkruaj email-in dhe fjalëkalimin.");
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const credentials = { email: email.trim(), password };
      const { data, error } = register
        ? await supabase.auth.signUp(credentials)
        : await supabase.auth.signInWithPassword(credentials);
      if (error) {
        setMessage(register
          ? "Regjistrimi nuk u krye. Kontrollo email-in dhe përdor një fjalëkalim të fortë."
          : "Hyrja nuk u krye. Kontrollo email-in, fjalëkalimin dhe konfirmimin e email-it.");
        return;
      }
      setPassword("");
      setUser(data.session?.user ?? null);
      if (register && !data.session) setMessage("Kontrollo email-in për konfirmim, pastaj hyr këtu.");
    } catch {
      setMessage("Lidhja dështoi. Kontrollo internetin dhe provo përsëri.");
    } finally { setBusy(false); }
  }

  async function signOut() {
    if (!supabase || busy) return;
    setBusy(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) setMessage("Dalja nuk u krye. Provo përsëri.");
      else setUser(null);
    } catch { setMessage("Kontrollo lidhjen me internetin."); }
    finally { setBusy(false); }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Stack.Screen options={{ title: "Hyrja" }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{user ? "Mirë se erdhe!" : "Hyr në llogari"}</Text>
        {user ? <>
          <Text style={styles.text}>Ke hyrë me llogarinë:</Text>
          <Text selectable style={styles.email}>{user.email}</Text>
          <Link href="/" style={styles.link}>Shiko eventet →</Link>
          <Pressable accessibilityRole="button" disabled={busy} onPress={() => void signOut()} style={styles.button}>
            <Text style={styles.buttonText}>{busy ? "Duke pritur…" : "Dil nga llogaria"}</Text>
          </Pressable>
        </> : <>
          <Text style={styles.text}>Përdor email-in tënd për të hyrë ose krijuar llogari.</Text>
          <TextInput accessibilityLabel="Email-i" placeholder="Email-i" autoCapitalize="none" autoCorrect={false} keyboardType="email-address" textContentType="emailAddress" value={email} onChangeText={setEmail} editable={!busy} style={styles.input} />
          <TextInput accessibilityLabel="Fjalëkalimi" placeholder="Fjalëkalimi" secureTextEntry autoCapitalize="none" autoCorrect={false} value={password} onChangeText={setPassword} editable={!busy} style={styles.input} />
          <Pressable accessibilityRole="button" disabled={busy || !supabase} onPress={() => void authenticate(false)} style={styles.button}>
            <Text style={styles.buttonText}>{busy ? "Duke pritur…" : "Hyr"}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" disabled={busy || !supabase} onPress={() => void authenticate(true)} style={styles.button}>
            <Text style={styles.buttonText}>Krijo llogari</Text>
          </Pressable>
        </>}
        {supabaseConfigError || message ? <Text accessibilityLiveRegion="polite" style={styles.text}>{supabaseConfigError || message}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, padding: 24, gap: 18, backgroundColor: "#f8fafc" },
  title: { fontSize: 28, fontWeight: "700", color: "#0f172a" },
  text: { fontSize: 16, color: "#334155", lineHeight: 24 },
  email: { fontSize: 20, fontWeight: "600", color: "#0f172a" },
  input: { borderWidth: 1, borderColor: "#94a3b8", borderRadius: 10, padding: 14, fontSize: 16, color: "#0f172a", backgroundColor: "white" },
  button: { backgroundColor: "#1d4ed8", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
  link: { color: "#1d4ed8", fontSize: 17, paddingVertical: 12 },
});
