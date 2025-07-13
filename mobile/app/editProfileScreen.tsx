// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useRouter } from "expo-router";
// import API from "../lib/axios";
// import { getToken } from "../lib/secureStore";
// import { uploadToCloudinary } from "../lib/cloudinary";

// export default function EditProfileScreen() {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     location: "",
//     bio: "",
//     avatar: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const fetchUser = async () => {
//     const token = await getToken();
//     try {
//       const res = await API.get("/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const {
//         name = "",
//         phone = "",
//         location = "",
//         bio = "",
//         avatar = "",
//       } = res.data || {};

//       setForm({ name, phone, location, bio, avatar });
//     } catch (err) {
//       Alert.alert("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pickAvatar = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//     });
//     if (!result.canceled) {
//       const image = result.assets[0];
//       const url = await uploadToCloudinary(image);
//       if (url) setForm((prev) => ({ ...prev, avatar: url }));
//     }
//   };

//   const handleUpdate = async () => {
//     const token = await getToken();
//     try {
//       await API.put("/auth/update", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       Alert.alert("Profile updated!");
//       router.push("./profile");
//     } catch (err) {
//       Alert.alert("Update failed");
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   if (loading)
//     return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

//   return (
//     <View style={styles.container}>
//       <View style={{ alignItems: "center" }}>
//         <TouchableOpacity onPress={pickAvatar}>
//           <Image
//             source={{
//               uri: form.avatar || "https://via.placeholder.com/100",
//             }}
//             style={styles.avatar}
//           />
//           <View style={styles.editIcon}>
//             <Text style={{ color: "#fff" }}>📷</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.label}>Name</Text>
//       <TextInput
//         value={form.name}
//         onChangeText={(text) => setForm({ ...form, name: text })}
//         style={styles.input}
//       />

//       <Text style={styles.label}>Phone</Text>
//       <TextInput
//         value={form.phone}
//         onChangeText={(text) => setForm({ ...form, phone: text })}
//         style={styles.input}
//         keyboardType="phone-pad"
//       />

//       <Text style={styles.label}>Location</Text>
//       <TextInput
//         value={form.location}
//         onChangeText={(text) => setForm({ ...form, location: text })}
//         style={styles.input}
//       />

//       <Text style={styles.label}>Bio</Text>
//       <TextInput
//         value={form.bio}
//         onChangeText={(text) => setForm({ ...form, bio: text })}
//         multiline
//         numberOfLines={3}
//         style={[styles.input, { height: 80 }]}
//       />

//       <TouchableOpacity onPress={handleUpdate} style={styles.button}>
//         <Text style={styles.buttonText}>Update</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignSelf: "center",
//     marginBottom: 10,
//   },
//   editIcon: {
//     position: "absolute",
//     bottom: 0,
//     right: 5,
//     backgroundColor: "#16a34a",
//     padding: 6,
//     borderRadius: 12,
//   },
//   label: { marginTop: 15, fontSize: 14, fontWeight: "600" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//     marginTop: 4,
//   },
//   button: {
//     backgroundColor: "#16a34a",
//     marginTop: 20,
//     padding: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
// });
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import API from "../lib/axios";
import { getToken } from "../lib/secureStore";
import { uploadToCloudinary } from "../lib/cloudinary";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function EditProfileScreen() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    const token = await getToken();
    try {
      const res = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const {
        name = "",
        phone = "",
        location = "",
        bio = "",
        avatar = "",
      } = res.data || {};

      setForm({ name, phone, location, bio, avatar });
    } catch (err) {
      Alert.alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      const image = result.assets[0];
      const url = await uploadToCloudinary(image);
      if (url) setForm((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleUpdate = async () => {
    const token = await getToken();
    try {
      await API.put("/auth/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Profile updated!");
      router.push("./profile");
    } catch (err) {
      Alert.alert("Update failed");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <TouchableOpacity onPress={pickAvatar}>
          <Image
            source={{
              uri: form.avatar || "https://via.placeholder.com/100",
            }}
            style={styles.avatar}
          />
          <View style={styles.editIcon}>
            <Ionicons name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
        <TextInput
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#888"
        />
      </View>

      {/* Phone */}
      <Text style={styles.label}>Phone</Text>
      <View style={styles.inputWrapper}>
        <MaterialIcons name="phone" size={20} color="#888" style={styles.icon} />
        <TextInput
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Enter your phone"
          placeholderTextColor="#888"
        />
      </View>

      {/* Location */}
      <Text style={styles.label}>Location</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="location-outline" size={20} color="#888" style={styles.icon} />
        <TextInput
          value={form.location}
          onChangeText={(text) => setForm({ ...form, location: text })}
          style={styles.input}
          placeholder="Enter your location"
          placeholderTextColor="#888"
        />
      </View>

      {/* Bio */}
      <Text style={styles.label}>Bio</Text>
      <View style={[styles.inputWrapper, { height: 80, alignItems: "flex-start" }]}>
        <MaterialIcons name="info-outline" size={20} color="#888" style={[styles.icon, { marginTop: 8 }]} />
        <TextInput
          value={form.bio}
          onChangeText={(text) => setForm({ ...form, bio: text })}
          multiline
          numberOfLines={3}
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
          placeholder="Tell us about yourself"
          placeholderTextColor="#888"
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity onPress={handleUpdate} style={styles.button} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 26, 
    backgroundColor: "#fff" 
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: "#f4f4f4",
    backgroundColor: "#E1E1E1",
  },
  editIcon: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#2776ea",
    padding: 7,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#2776ea",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  label: { 
    marginTop: 12, 
    marginBottom: 3, 
    fontSize: 14.3, 
    fontWeight: "600", 
    color: "#222" 
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.15,
    borderColor: "#e2e3e6",
    borderRadius: 12,
    marginBottom: 7,
    paddingHorizontal: 8,
    height: 48,
    minHeight: 48,
    width: "100%",
  },
  icon: {
    marginRight: 9,
    marginLeft: 2,
  },
  input: {
    flex: 1,
    fontSize: 15.7,
    color: "#222",
    fontWeight: "500",
    paddingVertical: 7,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2776ea",
    marginTop: 26,
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#2776ea",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 16,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.1,
  },
});