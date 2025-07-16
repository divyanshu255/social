
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import API from "../../lib/axios";
import { saveToken } from "../../lib/secureStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      await saveToken(res.data.token);
      router.replace("../(tabs)/home"); 
    } catch (err) {
      alert("Login Failed\n" + (err.response?.data?.message || "Check your credentials"));
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
        <Ionicons name="arrow-back" size={26} color="#232323" />
      </TouchableOpacity>

      <Text style={styles.heading}>Hey, Welcome Back</Text>

      <View style={styles.inputWrapper}>
        <MaterialIcons name="email" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.87} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don’t have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/signup")}>Sign up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 42,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    top: 38,
    left: 18,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#232323",
    marginTop: 62,
    alignSelf: "flex-start",
    marginBottom: 23,
    letterSpacing: 0.2,
    lineHeight: 38,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.25,
    borderColor: "#e2e3e6",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 8,
    height: 52,
    minHeight: 52,
    width: "100%",
  },
  icon: {
    marginRight: 9,
    marginLeft: 2,
  },
  input: {
    flex: 1,
    fontSize: 15.6,
    color: "#222",
    fontWeight: "500",
    paddingVertical: 7,
  },
  button: {
    backgroundColor: "#2776ea",
    paddingVertical: 15,
    borderRadius: 13,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: "#2776ea",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  footer: {
    marginTop: 25,
    fontSize: 15,
    color: "#222",
    fontWeight: "400",
    textAlign: "center",
  },
  link: {
    color: "#2776ea",
    fontWeight: "bold",
    fontSize: 15,
  },
});
