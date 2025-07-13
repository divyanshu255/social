// // // import { useState, useEffect } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   Image,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Alert,
// // //   ScrollView,
// // // } from "react-native";
// // // import Images from '../assets/icons/Image.jsx';
// // // import Video from '../assets/icons/Video.jsx';
// // // import * as ImagePicker from "expo-image-picker";
// // // import { useRouter } from "expo-router";
// // // import { getToken } from "../lib/secureStore";
// // // import API from "../lib/axios";
// // // import { uploadToCloudinary } from "../lib/cloudinary";

// // // export default function CreatePostScreen() {
// // //   const [user, setUser] = useState(null);
// // //   const [caption, setCaption] = useState("");
// // //   const [image, setImage] = useState(null);
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     (async () => {
// // //       const token = await getToken();
// // //       const { data } = await API.get("/auth/me", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setUser(data);
// // //     })();
// // //   }, []);

// // //   const pickImage = async () => {
// // //     const result = await ImagePicker.launchImageLibraryAsync({
// // //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // //       quality: 0.7,
// // //     });

// // //     if (!result.canceled) {
// // //       const img = result.assets[0];
// // //       const uploadedUrl = await uploadToCloudinary(img);
// // //       if (uploadedUrl) {
// // //         setImage(uploadedUrl);
// // //       } else {
// // //         Alert.alert("Upload failed", "Couldn't upload image to Cloudinary.");
// // //       }
// // //     }
// // //   };

// // //   const handlePost = async () => {
// // //     if (!caption.trim() && !image) {
// // //       return Alert.alert("Post cannot be empty");
// // //     }

// // //     const token = await getToken();
// // //     try {
// // //       await API.post(
// // //         "/posts",
// // //         { caption, imageUrl: image },
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
// // //        Alert.alert("Posted Successfully");
// // //       router.push("/home"); 
// // //     } catch (err) {
// // //       Alert.alert("Failed to post", err.message);
// // //     }
// // //   };

// // //   if (!user) return null;

// // //   return (
// // //     <ScrollView contentContainerStyle={styles.container}>
// // //       {/* Header Row */}
// // //       <View style={styles.headerRow}>
// // //         <TouchableOpacity onPress={() => router.back()}>
// // //           <Text style={styles.headerIcon}>←</Text>
// // //         </TouchableOpacity>
// // //         <Text style={styles.title}>Create Post</Text>
// // //         <View style={{ width: 24 }} />
// // //       </View>

// // //       {/* User Info */}
// // //       <View style={styles.userRow}>
// // //         <Image source={{ uri: user.avatar }} style={styles.avatar} />
// // //         <View style={{width:50}}>
// // //           <Text style={styles.username}>{user.name}</Text>
// // //           <Text style={styles.public}>Public</Text>
// // //         </View>
// // //       </View>

// // //       {/* Editor Box */}
// // //       <View style={styles.editorBox}>
// // //         <View style={styles.toolbar}>
// // //           {["S", "/", "B", "I", "❝", "≡", "≣"].map((symbol, idx) => (
// // //             <Text key={idx} style={styles.tool}>{symbol}</Text>
// // //           ))}
// // //         </View>
// // //         <TextInput
// // //           value={caption}
// // //           onChangeText={setCaption}
// // //           placeholder="What's on your mind?"
// // //           multiline
// // //           style={styles.input}
// // //         />
// // //       </View>

// // //       {/* Attachments */}
// // //       <View style={styles.addPostRow}>
// // //         <Text style={styles.addText}>Add to your Post</Text>
// // //         <View style={styles.iconRow}>
// // //           <TouchableOpacity onPress={pickImage}>
// // //             {/* <Text style={styles.icon}>🖼️</Text> */}
// // //           <Images  size={50} color="#444"/>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity>
// // //             {/* <Text style={styles.icon}>📷</Text>
// // //              */}
// // //              <Video/>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>

// // //       {/* Preview */}
// // //       {image && <Image source={{ uri: image }} style={styles.preview} />}

// // //       {/* Post Button */}
// // //       <TouchableOpacity onPress={handlePost} style={styles.postButton}>
// // //         <Text style={styles.postButtonText}>Post</Text>
// // //       </TouchableOpacity>
// // //     </ScrollView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     backgroundColor: "#fff",
// // //     padding: 20,
// // //     paddingBottom: 50,
// // //   },
// // //   headerRow: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     marginBottom: 20,
// // //   },
// // //   headerIcon: {
// // //     fontSize: 22,
// // //   },
// // //   title: {
// // //     fontSize: 20,
// // //     fontWeight: "bold",
// // //   },
// // //   userRow: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 10,
// // //     marginBottom: 14,
// // //   },
// // //   avatar: {
// // //     width: 45,
// // //     height: 45,
// // //     borderRadius: 22.5,
// // //   },
// // //   username: {
// // //     fontWeight: "bold",
// // //     fontSize: 16,
// // //   },
// // //   public: {
// // //     color: "#888",
// // //     fontSize: 13,
// // //     // height:30
// // //   },
// // //   editorBox: {
// // //     backgroundColor: "#f4f4f4",
// // //     borderRadius: 10,
// // //     overflow: "hidden",
// // //   },
// // //   toolbar: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-around",
// // //     paddingVertical: 8,
// // //     borderBottomWidth: 1,
// // //     borderColor: "#ddd",
// // //     backgroundColor: "#e0e0e0",
// // //   },
// // //   tool: {
// // //     fontSize: 14,
// // //     fontWeight: "bold",
// // //   },
// // //   input: {
// // //     minHeight: 120,
// // //     padding: 10,
// // //     fontSize: 16,
// // //     backgroundColor: "#fff",
// // //   },
// // //   addPostRow: {
// // //     marginTop: 20,
// // //     padding: 12,
// // //     borderRadius: 10,
// // //     backgroundColor: "#f1f1f1",
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //   },
// // //   addText: {
// // //     fontSize: 16,
    
// // //   },
// // //   iconRow: {
// // //     flexDirection: "row",
// // //     gap: 12,
// // //   },
// // //   icon: {
// // //     fontSize: 20,
// // //   },
// // //   preview: {
// // //     width: "100%",
// // //     height: 220,
// // //     marginTop: 12,
// // //     borderRadius: 12,
// // //   },
// // //   postButton: {
// // //     backgroundColor: "#16a34a",
// // //     marginTop: 30,
// // //     padding: 14,
// // //     borderRadius: 10,
// // //     alignItems: "center",
// // //   },
// // //   postButtonText: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "bold",
// // //   },
// // // });

// // import { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   Image,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   ScrollView,
// //   SafeAreaView,
// //   Platform,
// // } from "react-native";
// // import Images from '../assets/icons/Image.jsx';
// // import Video from '../assets/icons/Video.jsx';
// // import * as ImagePicker from "expo-image-picker";
// // import { useRouter } from "expo-router";
// // import { getToken } from "../lib/secureStore";
// // import API from "../lib/axios";
// // import { uploadToCloudinary } from "../lib/cloudinary";

// // export default function CreatePostScreen() {
// //   const [user, setUser] = useState(null);
// //   const [caption, setCaption] = useState("");
// //   const [image, setImage] = useState(null);
// //   const router = useRouter();

// //   useEffect(() => {
// //     (async () => {
// //       const token = await getToken();
// //       const { data } = await API.get("/auth/me", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUser(data);
// //     })();
// //   }, []);

// //   const pickImage = async () => {
// //     const result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       quality: 0.7,
// //     });

// //     if (!result.canceled) {
// //       const img = result.assets[0];
// //       const uploadedUrl = await uploadToCloudinary(img);
// //       if (uploadedUrl) {
// //         setImage(uploadedUrl);
// //       } else {
// //         Alert.alert("Upload failed", "Couldn't upload image to Cloudinary.");
// //       }
// //     }
// //   };

// //   const handlePost = async () => {
// //     if (!caption.trim() && !image) {
// //       return Alert.alert("Post cannot be empty");
// //     }

// //     const token = await getToken();
// //     try {
// //       await API.post(
// //         "/posts",
// //         { caption, imageUrl: image },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       Alert.alert("Posted Successfully");
// //       router.push("/home"); 
// //     } catch (err) {
// //       Alert.alert("Failed to post", err.message);
// //     }
// //   };

// //   if (!user) return null;

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
// //         {/* Header Row */}
// //         <View style={styles.headerRow}>
// //           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
// //             <Text style={styles.headerIcon}>‹</Text>
// //           </TouchableOpacity>
// //           <Text style={styles.title}>Create Post</Text>
// //           <View style={{ width: 28 }} />
// //         </View>

// //         {/* User Info */}
// //         <View style={styles.userRow}>
// //           <Image source={{ uri: user.avatar }} style={styles.avatar} />
// //           <View style={styles.userInfo}>
// //             <Text style={styles.username} numberOfLines={1}>{user.name}</Text>
// //             <Text style={styles.public}>Public</Text>
// //           </View>
// //         </View>

// //         {/* Editor Box */}
// //         <View style={styles.editorBox}>
// //           <View style={styles.toolbar}>
// //             <Text style={styles.tool}>{'S'}</Text>
// //             <Text style={[styles.tool, { marginHorizontal: 2 }]}>/</Text>
// //             <Text style={styles.tool}>{'B'}</Text>
// //             <Text style={styles.tool}>{'I'}</Text>
// //             <Text style={styles.tool}>{'❝'}</Text>
// //             <Text style={styles.tool}>{'≡'}</Text>
// //             <Text style={styles.tool}>{'≣'}</Text>
// //           </View>
// //           <TextInput
// //             value={caption}
// //             onChangeText={setCaption}
// //             placeholder="What's on your mind?"
// //             multiline
// //             style={styles.input}
// //             placeholderTextColor="#A9A9A9"
// //             underlineColorAndroid="transparent"
// //           />
// //         </View>

// //         {/* Attachments */}
// //         <View style={styles.addPostRow}>
// //           <Text style={styles.addText}>Add to your post</Text>
// //           <View style={styles.iconRow}>
// //             <TouchableOpacity onPress={pickImage} style={styles.iconBtn}>
// //               <Images size={26} color="#222"/>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.iconBtn}>
// //               <Video size={26} color="#222"/>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Preview */}
// //         {image && <Image source={{ uri: image }} style={styles.preview} />}

// //         {/* Post Button */}
// //         <TouchableOpacity onPress={handlePost} style={styles.postButton} activeOpacity={0.8}>
// //           <Text style={styles.postButtonText}>Post</Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: "#F9F9F9",
// //   },
// //   container: {
// //     backgroundColor: "#F9F9F9",
// //     paddingHorizontal: 0,
// //     paddingBottom: 0,
// //     minHeight: "100%",
// //     minWidth: "100%",
// //   },
// //   headerRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingTop: Platform.OS === 'ios' ? 16 : 24,
// //     paddingHorizontal: 18,
// //     marginBottom: 4,
// //     backgroundColor: "#fff",
// //     borderBottomWidth: 1,
// //     borderColor: "#F0F0F0",
// //     height: 62,
// //   },
// //   backBtn: {
// //     width: 28,
// //     height: 28,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   headerIcon: {
// //     fontSize: 26,
// //     color: "#222",
// //     fontWeight: "500",
// //     marginTop: -2,
// //     marginLeft: -2,
// //   },
// //   title: {
// //     fontSize: 19,
// //     fontWeight: "600",
// //     letterSpacing: 0.2,
// //     color: "#222",
// //     marginLeft: -22,
// //   },
// //   userRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 10,
// //     paddingHorizontal: 18,
// //     marginTop: 17,
// //     marginBottom: 7,
// //   },
// //   avatar: {
// //     width: 46,
// //     height: 46,
// //     borderRadius: 23,
// //     backgroundColor: "#E1E1E1",
// //   },
// //   userInfo: {
// //     flexDirection: "column",
// //     justifyContent: "center",
// //     marginLeft: 8,
// //     width: 120,
// //   },
// //   username: {
// //     fontWeight: "600",
// //     fontSize: 15.5,
// //     color: "#252525",
// //     marginBottom: 1,
// //     maxWidth: 110,
// //   },
// //   public: {
// //     color: "#888",
// //     fontSize: 13,
// //     fontWeight: "400",
// //     marginTop: 0,
// //     letterSpacing: 0.2,
// //   },
// //   editorBox: {
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: 13,
// //     marginHorizontal: 14,
// //     marginTop: 7,
// //     overflow: "hidden",
// //     borderColor: "#E4E4E4",
// //     borderWidth: 1,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.03,
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowRadius: 2,
// //     elevation: 2,
// //   },
// //   toolbar: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingVertical: 7,
// //     paddingHorizontal: 11,
// //     borderBottomWidth: 1,
// //     borderColor: "#E9E9E9",
// //     backgroundColor: "#F5F5F5",
// //     minHeight: 36,
// //     gap: 4,
// //   },
// //   tool: {
// //     fontSize: 15,
// //     fontWeight: "600",
// //     color: "#989898",
// //     paddingHorizontal: 2,
// //   },
// //   input: {
// //     minHeight: 110,
// //     paddingHorizontal: 12,
// //     paddingVertical: 10,
// //     fontSize: 15.7,
// //     color: "#232323",
// //     backgroundColor: "#fff",
// //     textAlignVertical: "top",
// //     lineHeight: 21,
// //     borderTopWidth: 0,
// //     borderBottomWidth: 0,
// //   },
// //   addPostRow: {
// //     marginTop: 16,
// //     marginHorizontal: 14,
// //     paddingVertical: 11,
// //     paddingHorizontal: 13,
// //     borderRadius: 12,
// //     backgroundColor: "#FFF",
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     borderWidth: 1,
// //     borderColor: "#E4E4E4",
// //     minHeight: 50,
// //   },
// //   addText: {
// //     fontSize: 15,
// //     fontWeight: "500",
// //     color: "#303030",
// //     letterSpacing: 0.1,
// //   },
// //   iconRow: {
// //     flexDirection: "row",
// //     gap: 13,
// //   },
// //   iconBtn: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 8,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "#F4F4F4",
// //     marginLeft: 0,
// //   },
// //   preview: {
// //     width: "90%",
// //     alignSelf: "center",
// //     height: 196,
// //     marginTop: 15,
// //     borderRadius: 13,
// //     resizeMode: "cover",
// //     borderWidth: 1,
// //     borderColor: "#E4E4E4",
// //     backgroundColor: "#F5F5F5",
// //   },
// //   postButton: {
// //     backgroundColor: "#19BB4A",
// //     marginTop: 30,
// //     marginHorizontal: 14,
// //     paddingVertical: 14,
// //     borderRadius: 13,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginBottom: 28,
// //     shadowColor: "#19BB4A",
// //     shadowOpacity: 0.14,
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowRadius: 18,
// //     elevation: 4,
// //   },
// //   postButtonText: {
// //     color: "#fff",
// //     fontSize: 17,
// //     fontWeight: "700",
// //     letterSpacing: 0.2,
// //   },
// // });
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Images from "../../assets/icons/Image.jsx";
import Video from "../../assets/icons/Video.jsx";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { getToken } from "../../lib/secureStore.js";
import API from "../../lib/axios.js";
import { uploadToCloudinary } from "../../lib/cloudinary.js";

const BLUE = "#2776ea";
const BG = "#fafdff";

export default function CreatePostScreen() {
  const [user, setUser] = useState(null);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const { data } = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      const uploadedUrl = await uploadToCloudinary(img);
      if (uploadedUrl) {
        setImage(uploadedUrl);
      } else {
        Alert.alert("Upload failed", "Couldn't upload image to Cloudinary.");
      }
    }
  };

  const handlePost = async () => {
    if (!caption.trim() && !image) {
      return Alert.alert("Post cannot be empty");
    }

    const token = await getToken();
    try {
      await API.post(
        "/posts",
        { caption, imageUrl: image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Posted Successfully");
      router.push("/home");
    } catch (err) {
      Alert.alert("Failed to post", err.message);
    }
  };

  if (!user) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Row */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Text style={styles.headerIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Create Post</Text>
            <View style={{ width: 36 }} />
          </View>

          {/* User Info */}
          <View style={styles.userRow}>
            <View style={styles.avatarCircle}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username} numberOfLines={1}>
                {user.name}
              </Text>
              <Text style={styles.public}>Public</Text>
            </View>
          </View>

          {/* Editor Box */}
          <View style={styles.editorBox}>
            <View style={styles.toolbar}>
              <Text style={styles.tool}>S</Text>
              <Text style={[styles.tool, { marginHorizontal: 2 }]}>/</Text>
              <Text style={styles.tool}>B</Text>
              <Text style={styles.tool}>I</Text>
              <Text style={styles.tool}>❝</Text>
              <Text style={styles.tool}>≡</Text>
              <Text style={styles.tool}>≣</Text>
            </View>
            <TextInput
              value={caption}
              onChangeText={setCaption}
              placeholder="What's on your mind?"
              multiline
              style={styles.input}
              placeholderTextColor="#A9A9A9"
              underlineColorAndroid="transparent"
            />
          </View>

          {/* Attachments */}
          <View style={styles.addPostRow}>
            <Text style={styles.addText}>Add to your post</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={pickImage} style={styles.iconBtn}>
                <Images size={26} color={BLUE} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Video size={26} color={BLUE} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Preview */}
          {image && (
            <View style={styles.previewBox}>
              <Image source={{ uri: image }} style={styles.preview} />
            </View>
          )}
        </ScrollView>

        {/* Post Button - absolutely positioned to avoid overlap with keyboard/camera */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlePost}
            style={styles.postButton}
            activeOpacity={0.84}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG,
    minHeight: "100%",
    paddingBottom: 90, // space below for button
    paddingTop: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 18 : 22,
    paddingHorizontal: 17,
    marginBottom: 1,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#EFF3FA",
    height: 59,
    zIndex: 2,
    elevation: 2,
  },
  backBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    fontSize: 26,
    color: BLUE,
    fontWeight: "500",
    marginTop: -2,
    marginLeft: -2,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: BLUE,
    marginLeft: -16,
    letterSpacing: 0.13,
    textShadowColor: "#eaf1fd",
    textShadowRadius: 4,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginTop: 16,
    marginBottom: 6,
    gap: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e5ecfa",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#c3d3f7",
    borderWidth: 1.2,
    marginRight: 2,
    shadowColor: "#e1eefd",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    overflow: "hidden",
  },
  avatar: {
    width: 41,
    height: 41,
    borderRadius: 21,
    backgroundColor: "#dde8fc",
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 8,
    width: 130,
  },
  username: {
    fontWeight: "600",
    fontSize: 15.7,
    color: "#23324d",
    marginBottom: 1,
    maxWidth: 130,
  },
  public: {
    color: "#8ca7cc",
    fontSize: 13.2,
    fontWeight: "500",
    marginTop: 1,
    letterSpacing: 0.13,
  },
  editorBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: 14,
    marginTop: 7,
    overflow: "hidden",
    borderColor: "#e6e9f2",
    borderWidth: 1.1,
    shadowColor: "#c3d3f7",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#e6e9f2",
    backgroundColor: "#f5f8fd",
    minHeight: 36,
    gap: 5,
  },
  tool: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8ca7cc",
    paddingHorizontal: 2,
  },
  input: {
    minHeight: 110,
    paddingHorizontal: 13,
    paddingVertical: 10,
    fontSize: 15.9,
    color: "#232323",
    backgroundColor: "#fff",
    textAlignVertical: "top",
    lineHeight: 22,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    letterSpacing: 0.07,
  },
  addPostRow: {
    marginTop: 16,
    marginHorizontal: 14,
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 13,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e6e9f2",
    minHeight: 50,
  },
  addText: {
    fontSize: 15.2,
    fontWeight: "500",
    color: "#23324d",
    letterSpacing: 0.13,
  },
  iconRow: {
    flexDirection: "row",
    gap: 13,
  },
  iconBtn: {
    width: 37,
    height: 37,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5ecfa",
    borderColor: "#c3d3f7",
    borderWidth: 1,
  },
  previewBox: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 3,
  },
  preview: {
    width: "91%",
    height: 186,
    borderRadius: 13,
    resizeMode: "cover",
    borderWidth: 1.2,
    borderColor: "#e6e9f2",
    backgroundColor: "#f5f8fd",
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    alignItems: "center",
    zIndex: 99,
  },
  postButton: {
    backgroundColor: BLUE,
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: BLUE,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 18,
    elevation: 4,
    marginBottom: 0,
    width: "92%",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.14,
  },
});