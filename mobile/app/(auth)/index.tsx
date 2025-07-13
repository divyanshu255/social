import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/premium-vector/vector-illustration-two-people-casual-meeting-setting_844724-600.jpg",
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bondly</Text>
      <Text style={styles.subtitle}>
        Where every thought finds a home and{"\n"}every image tells a story.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Getting Started</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text onPress={() => router.push("/login")} style={styles.link}>
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    height: 220,
    width: 220,
    marginBottom: 32,
    marginTop: 10,
    borderRadius: 18,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.2,
    color: "#222",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15.7,
    textAlign: "center",
    marginVertical: 13,
    color: "#555",
    lineHeight: 22,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#2776ea",
    paddingVertical: 16,
    borderRadius: 13,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    shadowColor: "#2776ea",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 18,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  footer: {
    marginTop: 26,
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