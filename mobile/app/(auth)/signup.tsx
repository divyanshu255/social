
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import API from "../../lib/axios";
import { saveToken } from "../../lib/secureStore";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/register", { name, email, password });
      await saveToken(res.data.token);
      console.log("success");
      
      router.replace("../(tabs)/home");
    } catch (err) {
      Alert.alert("Signup Error", err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
        <Ionicons name="arrow-back" size={26} color="#232323" />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>Let's{"\n"}Get Started</Text>
      <Text style={styles.subheading}>
        Please fill the details to create an account
      </Text>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={21} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#888"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor="#888"
            style={styles.input}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#888"
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.push("/login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}

// styles stay unchanged


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 22,
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
    marginTop: 52,
    alignSelf: "flex-start",
    marginBottom: 7,
    letterSpacing: 0.2,
    lineHeight: 38,
  },
  subheading: {
    color: "#777",
    fontSize: 15.5,
    marginBottom: 22,
    alignSelf: "flex-start",
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 22,
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
    marginTop: 10,
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
