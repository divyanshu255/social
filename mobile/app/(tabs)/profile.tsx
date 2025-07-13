// // import { useState, useCallback } from "react";
// // import {
// //   View,
// //   Text,
// //   Image,
// //   TouchableOpacity,
// //   FlatList,
// //   StyleSheet,
// //   Alert,
// //   ScrollView,
// // } from "react-native";
// // import { useRouter, useFocusEffect } from "expo-router";
// // import Edit from "../assets/icons/Edit.jsx";
// // import Logout from "../assets/icons/logout.jsx";
// // import Location from "../assets/icons/Location.jsx";
// // import Mail from "../assets/icons/Mail.jsx";
// // import Call from "../assets/icons/Call.jsx";
// // import Heart from "../assets/icons/Heart.jsx";
// // import Comment from "../assets/icons/Comment.jsx";
// // import Delete from "../assets/icons/Delete.jsx";


// // import API from "../lib/axios";
// // import { getToken, removeToken } from "../lib/secureStore";
// // // import Comment from './../../../assets/icons/Comment';

// // export default function Profile() {
// //   const [user, setUser] = useState(null);
// //   const [posts, setPosts] = useState([]);
// //   const router = useRouter();

// //   const fetchProfile = async () => {
// //     const token = await getToken();
// //     const { data: me } = await API.get("/auth/me", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });
// //     setUser(me);

// //     const { data: userPosts } = await API.get(`/posts/user/${me._id}`, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });
// //     setPosts(userPosts);
// //   };

// //   const logout = async () => {
// //     await removeToken();
// //     router.replace("/login");
// //   };

// //   const goToEdit = () => {
// //     router.push("/editProfileScreen");
// //   };

// //   const deletePost = async (postId) => {
// //     Alert.alert("Delete Post", "Are you sure?", [
// //       { text: "Cancel" },
// //       {
// //         text: "Delete",
// //         style: "destructive",
// //         onPress: async () => {
// //           const token = await getToken();
// //           await API.delete(`/posts/${postId}`, {
// //             headers: { Authorization: `Bearer ${token}` },
// //           });
// //           fetchProfile();
// //         },
// //       },
// //     ]);
// //   };

// //   useFocusEffect(
// //     useCallback(() => {
// //       fetchProfile();
// //     }, [])
// //   );

// //   if (!user) return null;

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <View style={styles.headerRow}>
// //         <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
// //           <Text style={{ fontSize: 24 }}>←</Text>
// //         </TouchableOpacity>

// //         <Text style={styles.headerTitle}>Profile</Text>

// //         <TouchableOpacity onPress={logout}>
// //           {/* <Text style={styles.logout}>⏻</Text>
// //            */}
// //            <Logout/>
// //         </TouchableOpacity>
// //       </View>

// //       <View style={styles.avatarWrapper}>
// //         <Image
// //           source={{ uri: user.avatar || "https://via.placeholder.com/100" }}
// //           style={styles.avatar}
// //         />
// //         <TouchableOpacity style={styles.editButton} onPress={goToEdit}>
// //           {/* <Text style={styles.editIcon}>✏️</Text>
// //            */}
// //            <Edit/>
// //         </TouchableOpacity>
// //       </View>

// //       <Text style={styles.name}>{user.name}</Text>
// //       {!!user.location && <Text style={styles.location}><Location/>{user.location}</Text>}
// //       {!!user.email && <Text style={styles.info}><Mail/> {user.email}</Text>}
// //       {!!user.phone && <Text style={styles.info}><Call/> {user.phone}</Text>}
// //       {!!user.bio && <Text style={styles.bio}>{user.bio}</Text>}

// //       <View style={{ marginTop: 20 }}>
// //         {posts.map((item) => (
// //           <View key={item._id} style={styles.postCard}>
// //             <View style={styles.postHeader}>
// //               <Image
// //                 source={{ uri: user.avatar }}
// //                 style={styles.postAvatar}
// //               />
// //               <View>
// //                 <Text style={styles.postUser}>{user.name}</Text>
// //                 <Text style={styles.postDate}>
// //                   {new Date(item.createdAt).toDateString().slice(4)}
// //                 </Text>
// //               </View>
// //               <TouchableOpacity onPress={() => deletePost(item._id)}>
// //                 <Text style={styles.menu}><Delete/></Text>
// //               </TouchableOpacity>
// //             </View>

// //             <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
// //             <View style={styles.postActions}>
// //               <Text><Heart/> {item.likes?.length || 0}</Text>
// //               <Text><Comment/> {item.comments?.length || 0}</Text>
// //               <Text>↗</Text>
// //             </View>
// //           </View>
// //         ))}
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: "#fff",
// //     paddingBottom: 40,
// //   },
// //   headerRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     padding: 20,
// //   },
// //   headerTitle: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //   },
// //   backBtn: {
// //     padding: 4,
// //   },
// //   logout: {
// //     fontSize: 22,
// //   },
// //   avatarWrapper: {
// //     alignItems: "center",
// //     marginBottom: 8,
// //     position: "relative",
// //   },
// //   avatar: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //   },
// //   editButton: {
// //     position: "absolute",
// //     right: "36%",
// //     bottom: 0,
// //     backgroundColor: "#eee",
// //     padding: 4,
// //     borderRadius: 12,
// //   },
// //   editIcon: {
// //     fontSize: 14,
// //   },
// //   name: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //   },
// //   location: {
// //     textAlign: "center",
// //     color: "#777",
// //     marginTop: 2,
// //   },
// //   info: {
// //     textAlign: "center",
// //     color: "#555",
// //     marginTop: 2,
// //   },
// //   bio: {
// //     textAlign: "center",
// //     color: "#444",
// //     marginTop: 4,
// //     fontStyle: "italic",
// //   },
// //   postCard: {
// //     backgroundColor: "#f8f8f8",
// //     marginHorizontal: 20,
// //     marginVertical: 10,
// //     borderRadius: 14,
// //     overflow: "hidden",
// //   },
// //   postHeader: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 10,
// //     gap: 10,
// //     justifyContent: "space-between",
// //   },
// //   postAvatar: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //   },
// //   postUser: {
// //     fontWeight: "bold",
// //   },
// //   postDate: {
// //     fontSize: 12,
// //     color: "#666",
// //   },
// //   menu: {
// //     fontSize: 20,
// //     padding: 5,
// //   },
// //   postImage: {
// //     width: "100%",
// //     height: 220,
// //   },
// //   postActions: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     padding: 12,
// //     borderTopWidth: 1,
// //     borderColor: "#ddd",
// //   },
// // });
// import { useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { useRouter, useFocusEffect } from "expo-router";
// import Edit from "../assets/icons/Edit.jsx";
// import Logout from "../assets/icons/logout.jsx";
// import Location from "../assets/icons/Location.jsx";
// import Mail from "../assets/icons/Mail.jsx";
// import Call from "../assets/icons/Call.jsx";
// import Heart from "../assets/icons/Heart.jsx";
// import Comment from "../assets/icons/Comment.jsx";
// import Delete from "../assets/icons/Delete.jsx";
// import API from "../lib/axios";
// import { getToken, removeToken } from "../lib/secureStore";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const router = useRouter();

//   const fetchProfile = async () => {
//     const token = await getToken();
//     const { data: me } = await API.get("/auth/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setUser(me);

//     const { data: userPosts } = await API.get(`/posts/user/${me._id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setPosts(userPosts);
//   };

//   const logout = async () => {
//     await removeToken();
//     router.replace("/login");
//   };

//   const goToEdit = () => {
//     router.push("/editProfileScreen");
//   };

//   const deletePost = async (postId) => {
//     Alert.alert("Delete Post", "Are you sure?", [
//       { text: "Cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           const token = await getToken();
//           await API.delete(`/posts/${postId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           fetchProfile();
//         },
//       },
//     ]);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchProfile();
//     }, [])
//   );

//   if (!user) return null;

//   return (
//     <ScrollView 
//       style={{ flex: 1, backgroundColor: "#FAFAFA" }}
//       contentContainerStyle={styles.container}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Header */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//           <Text style={styles.headerIcon}>‹</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Profile</Text>
//         <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
//           <Logout />
//         </TouchableOpacity>
//       </View>

//       {/* Profile Avatar with Edit */}
//       <View style={styles.avatarWrapper}>
//         <Image
//           source={{ uri: user.avatar || "https://via.placeholder.com/100" }}
//           style={styles.avatar}
//         />
//         <TouchableOpacity style={styles.editButton} onPress={goToEdit}>
//           <Edit />
//         </TouchableOpacity>
//       </View>

//       {/* Name */}
//       <Text style={styles.name}>{user.name}</Text>

//       {/* Location */}
//       {!!user.location && (
//         <View style={styles.locationRow}>
//           <Location style={{ marginRight: 3 }} />
//           <Text style={styles.location}>{user.location}</Text>
//         </View>
//       )}

//       {/* Email */}
//       {!!user.email && (
//         <View style={styles.infoRow}>
//           <Mail style={{ marginRight: 5 }} />
//           <Text style={styles.info}>{user.email}</Text>
//         </View>
//       )}

//       {/* Phone */}
//       {!!user.phone && (
//         <View style={styles.infoRow}>
//           <Call style={{ marginRight: 5 }} />
//           <Text style={styles.info}>{user.phone}</Text>
//         </View>
//       )}

//       {/* Bio */}
//       {!!user.bio && <Text style={styles.bio}>{user.bio}</Text>}

//       {/* Posts */}
//       <View style={{ marginTop: 18, marginBottom: 10 }}>
//         {posts.map((item) => (
//           <View key={item._id} style={styles.postCard}>
//             <View style={styles.postHeader}>
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <Image source={{ uri: user.avatar }} style={styles.postAvatar} />
//                 <View style={{ marginLeft: 10 }}>
//                   <Text style={styles.postUser}>{user.name}</Text>
//                   <Text style={styles.postDate}>
//                     {new Date(item.createdAt).toLocaleString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </Text>
//                 </View>
//               </View>
//               <TouchableOpacity
//                 onPress={() => deletePost(item._id)}
//                 style={styles.menuBtn}
//               >
//                 <Delete />
//               </TouchableOpacity>
//             </View>
//             {item.imageUrl && (
//               <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
//             )}
//             <View style={styles.postActions}>
//               <View style={styles.iconWithCount}>
//                 <Heart />
//                 <Text style={styles.actionCount}>
//                   {item.likes?.length || 0}
//                 </Text>
//               </View>
//               <View style={styles.iconWithCount}>
//                 <Comment />
//                 <Text style={styles.actionCount}>
//                   {item.comments?.length || 0}
//                 </Text>
//               </View>
//               <Text style={styles.shareIcon}>↗</Text>
//             </View>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FAFAFA",
//     paddingBottom: 44,
//     paddingTop: Platform.OS === "ios" ? 8 : 18,
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 5,
//     backgroundColor: "#FAFAFA",
//   },
//   headerIcon: {
//     fontSize: 28,
//     color: "#353535",
//     fontWeight: "500",
//     marginLeft: -2,
//   },
//   headerTitle: {
//     fontSize: 21,
//     fontWeight: "600",
//     color: "#222",
//     letterSpacing: 0.2,
//     marginLeft: -20,
//   },
//   backBtn: {
//     width: 34,
//     height: 34,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 18,
//     backgroundColor: "#F2F2F2",
//   },
//   logoutBtn: {
//     width: 34,
//     height: 34,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 18,
//     backgroundColor: "#F2F2F2",
//   },
//   avatarWrapper: {
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 7,
//     position: "relative",
//     width: "100%",
//     justifyContent: "center",
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 4,
//     borderColor: "#fff",
//     backgroundColor: "#E4E4E4",
//   },
//   editButton: {
//     position: "absolute",
//     right: "36.5%",
//     bottom: 0,
//     backgroundColor: "#fff",
//     padding: 8,
//     borderRadius: 30,
//     borderWidth: 2,
//     borderColor: "#F4F4F4",
//     shadowColor: "#000",
//     shadowOpacity: 0.07,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: "700",
//     textAlign: "center",
//     color: "#222",
//     marginTop: 8,
//     marginBottom: 2,
//     letterSpacing: 0.2,
//   },
//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: -2,
//     marginBottom: 1,
//   },
//   location: {
//     color: "#888",
//     fontSize: 15,
//     fontWeight: "400",
//     marginLeft: 4,
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 2,
//   },
//   info: {
//     color: "#555",
//     fontSize: 15,
//     fontWeight: "400",
//     marginLeft: 2,
//   },
//   bio: {
//     textAlign: "center",
//     color: "#444",
//     marginTop: 5,
//     fontStyle: "italic",
//     fontSize: 15,
//     fontWeight: "400",
//   },
//   postCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 15,
//     marginVertical: 9,
//     borderRadius: 16,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "#EFEFEF",
//     shadowColor: "#000",
//     shadowOpacity: 0.04,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 7,
//     elevation: 2,
//   },
//   postHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 13,
//     paddingVertical: 11,
//   },
//   postAvatar: {
//     width: 39,
//     height: 39,
//     borderRadius: 19.5,
//     backgroundColor: "#ECECEC",
//   },
//   postUser: {
//     fontWeight: "700",
//     fontSize: 15.4,
//     color: "#232323",
//     marginBottom: 0,
//   },
//   postDate: {
//     fontSize: 13.5,
//     color: "#888",
//     marginTop: 0,
//     fontWeight: "400",
//   },
//   menuBtn: {
//     padding: 6,
//     marginLeft: 2,
//     borderRadius: 13,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   postImage: {
//     width: "100%",
//     height: 280,
//     backgroundColor: "#F5F5F5",
//     borderTopWidth: 1,
//     borderColor: "#F2F2F2",
//     resizeMode: "cover",
//   },
//   postActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: "#F2F2F2",
//     backgroundColor: "#fff",
//   },
//   iconWithCount: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 3,
//   },
//   actionCount: {
//     marginLeft: 5,
//     fontSize: 15,
//     fontWeight: "400",
//     color: "#888",
//   },
//   shareIcon: {
//     fontSize: 18,
//     color: "#888",
//     fontWeight: "500",
//     paddingTop: 2,
//     paddingLeft: 8,
//   },
// });
import { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import Edit from "../../assets/icons/Edit.jsx";
import Logout from "../../assets/icons/logout.jsx";
import Location from "../../assets/icons/Location.jsx";
import Mail from "../../assets/icons/Mail.jsx";
import Call from "../../assets/icons/Call.jsx";
import Heart from "../../assets/icons/Heart.jsx";
import Comment from "../../assets/icons/Comment.jsx";
import Delete from "../../assets/icons/Delete.jsx";
import API from "../../lib/axios.js";
import { getToken, removeToken } from "../../lib/secureStore.js";

const BLUE = "#2776ea";
const BG = "#fafdff";
const RED = "#E23D3D";
const windowHeight = Dimensions.get("window").height;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const router = useRouter();

  // For modal like animation feedback
  const [isAnimatingLike, setIsAnimatingLike] = useState(false);

  const fetchProfile = async () => {
    const token = await getToken();
    const { data: me } = await API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(me);

    const { data: userPosts } = await API.get(`/posts/user/${me._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(userPosts);
  };

  const logout = async () => {
    await removeToken();
    router.replace("/login");
  };

  const goToEdit = () => {
    router.push("../editProfileScreen");
  };

  const deletePost = async (postId) => {
    Alert.alert("Delete Post", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const token = await getToken();
          await API.delete(`/posts/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchProfile();
          setSelectedPost(null);
        },
      },
    ]);
  };

  // Like/Unlike for both modal and feed card
  const toggleLike = async (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id === postId) {
          const likesArray = Array.isArray(post.likes) ? post.likes : [];
          const hasLiked = likesArray.includes(user._id);
          const updatedLikes = hasLiked
            ? likesArray.filter((id) => id !== user._id)
            : [...likesArray, user._id];
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
    if (selectedPost && selectedPost._id === postId) {
      const likesArray = Array.isArray(selectedPost.likes) ? selectedPost.likes : [];
      const hasLiked = likesArray.includes(user._id);
      const updatedLikes = hasLiked
        ? likesArray.filter((id) => id !== user._id)
        : [...likesArray, user._id];
      setSelectedPost({ ...selectedPost, likes: updatedLikes });
      setIsAnimatingLike(true);
      setTimeout(() => setIsAnimatingLike(false), 360); // simple animation feedback
    }
    const token = await getToken();
    try {
      await API.post(`/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProfile();
    } catch (err) {
      console.error("Like error", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  if (!user) return null;

  const likedByUserModal = selectedPost && (selectedPost.likes || []).includes(user._id);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: BG }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.headerIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Logout />
        </TouchableOpacity>
      </View>

      {/* Profile Avatar with Edit */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Image
            source={{ uri: user.avatar || "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
        </View>
        <TouchableOpacity style={styles.editButton} onPress={goToEdit}>
          <Edit />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={styles.name}>{user.name}</Text>

      {/* Details Block */}
      <View style={styles.detailsBlock}>
        {!!user.location && (
          <View style={styles.detailRow}>
            <Location style={{ marginRight: 7, marginTop: 2 }} />
            <Text style={styles.detailText}>{user.location}</Text>
          </View>
        )}
        {!!user.email && (
          <View style={styles.detailRow}>
            <Mail style={{ marginRight: 7, marginTop: 2 }} />
            <Text style={styles.detailText}>{user.email}</Text>
          </View>
        )}
        {!!user.phone && (
          <View style={styles.detailRow}>
            <Call style={{ marginRight: 7, marginTop: 2 }} />
            <Text style={styles.detailText}>{user.phone}</Text>
          </View>
        )}
      </View>

      {/* Bio */}
      {!!user.bio && <Text style={styles.bio}>{user.bio}</Text>}

      {/* Posts */}
      <View style={{ marginTop: 18, marginBottom: 10 }}>
        {posts.map((item) => {
          const liked = (item.likes || []).includes(user._id);
          return (
            <View key={item._id} style={styles.postCard}>
              <TouchableOpacity
                activeOpacity={0.93}
                onPress={() => setSelectedPost(item)}
                style={{ flex: 1 }}
              >
                <View style={styles.postHeader}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.avatarCirclePost}>
                      <Image source={{ uri: user.avatar }} style={styles.postAvatar} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.postUser}>{user.name}</Text>
                      <Text style={styles.postDate}>
                        {new Date(item.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => deletePost(item._id)}
                    style={styles.menuBtn}
                  >
                    <Delete />
                  </TouchableOpacity>
                </View>
                {item.imageUrl && (
                  <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
                )}
                <View style={styles.postActions}>
                  <TouchableOpacity
                    style={styles.iconWithCount}
                    onPress={() => toggleLike(item._id)}
                  >
                    <Heart color={liked ? RED : BLUE} />
                    <Text style={[styles.actionCount, { color: liked ? RED : BLUE }]}>
                      {item.likes?.length || 0}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.iconWithCount}>
                    <Comment color={BLUE} />
                    <Text style={[styles.actionCount, { color: BLUE }]}>
                      {item.comments?.length || 0}
                    </Text>
                  </View>
                  <Text style={styles.shareIcon}>↗</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Modal for post details */}
      <Modal
        visible={!!selectedPost}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedPost(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => {
          setSelectedPost(null);
          fetchProfile();
        }}>
          <Pressable
            style={styles.modalSheet}
            onPress={() => {}} // Prevents modal from closing if pressing inside
          >
            {selectedPost && (
              <ScrollView
                style={{ flexGrow: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {/* Modal header area (clickable to close) */}
                <Pressable
                  style={styles.modalHeaderBar}
                  onPress={() => {
                    setSelectedPost(null);
                    fetchProfile();
                  }}
                >
                  <View style={styles.modalHeaderIndicator} />
                </Pressable>

                <View style={styles.card}>
                  <View style={styles.postHeader}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={styles.avatarCirclePost}>
                        <Image
                          source={{ uri: user.avatar }}
                          style={styles.postAvatar}
                        />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.postUser}>{user.name}</Text>
                        <Text style={styles.postDate}>
                          {new Date(selectedPost.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedPost(null);
                        fetchProfile();
                      }}
                      style={styles.menuBtn}
                    >
                      <Text style={{ fontSize: 24, color: "#555" }}>×</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.caption}>{selectedPost.caption}</Text>
                  {selectedPost.imageUrl && (
                    <Image
                      source={{ uri: selectedPost.imageUrl }}
                      style={styles.postImageModal}
                    />
                  )}
                  <View style={styles.postActionsModal}>
                    <TouchableOpacity
                      onPress={() => toggleLike(selectedPost._id)}
                      style={styles.iconWithCount}
                    >
                      <Heart color={likedByUserModal ? RED : BLUE} style={isAnimatingLike ? { transform: [{ scale: 1.2 }] } : {}} />
                      <Text
                        style={[
                          styles.actionCount,
                          { color: likedByUserModal ? RED : BLUE },
                        ]}
                      >
                        {selectedPost.likes?.length || 0}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.iconWithCount}>
                      <Comment color={BLUE} />
                      <Text style={[styles.actionCount, { color: BLUE }]}>
                        {selectedPost.comments?.length || 0}
                      </Text>
                    </View>
                    <Text style={styles.shareIcon}>↗</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => deletePost(selectedPost._id)}
                    style={styles.deleteBtn}
                  >
                    <Text style={{ color: RED, fontSize: 17, fontWeight: "600" }}>
                      🗑️ Delete Post
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG,
    paddingBottom: 44,
    paddingTop: Platform.OS === "ios" ? 8 : 18,
    minHeight: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: BG,
  },
  headerIcon: {
    fontSize: 28,
    color: BLUE,
    fontWeight: "500",
    marginLeft: -2,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: BLUE,
    letterSpacing: 0.2,
    marginLeft: -20,
    textShadowColor: "#eaf1fd",
    textShadowRadius: 3,
  },
  backBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    // backgroundColor: "#e5ecfa",
    // borderColor: "#c3d3f7",
    // borderWidth: 1,
  },
  logoutBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#e5ecfa",
    borderColor: "#c3d3f7",
    borderWidth: 1,
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 7,
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  avatarCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#e5ecfa",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#c3d3f7",
    borderWidth: 2,
    shadowColor: "#e1eefd",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    overflow: "hidden",
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: "#dde8fc",
  },
  editButton: {
    position: "absolute",
    right: "35%",
    bottom: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#F4F4F4",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
    marginTop: 8,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  detailsBlock: {
    backgroundColor: "#eaf1fd",
    marginHorizontal: 36,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    gap: 9,
    elevation: 1,
    shadowColor: "#e1eefd",
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  detailText: {
    color: "#23324d",
    fontSize: 15.4,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  bio: {
    textAlign: "center",
    color: "#444",
    marginTop: 5,
    fontStyle: "italic",
    fontSize: 15,
    fontWeight: "400",
  },
  postCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 9,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e6e9f2",
    shadowColor: "#beddfe",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  avatarCirclePost: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    backgroundColor: "#e5ecfa",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#c3d3f7",
    borderWidth: 1,
    overflow: "hidden",
  },
  postAvatar: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: "#dde8fc",
  },
  postUser: {
    fontWeight: "700",
    fontSize: 15.4,
    color: "#232323",
    marginBottom: 0,
  },
  postDate: {
    fontSize: 13.5,
    color: BLUE,
    marginTop: 0,
    fontWeight: "500",
  },
  menuBtn: {
    padding: 6,
    marginLeft: 2,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  postImage: {
    width: "100%",
    height: 260,
    backgroundColor: "#F5F5F5",
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    resizeMode: "cover",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "#fff",
  },
  postActionsModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "#fff",
  },
  iconWithCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  actionCount: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "600",
    color: BLUE,
  },
  shareIcon: {
    fontSize: 18,
    color: BLUE,
    fontWeight: "500",
    paddingTop: 2,
    paddingLeft: 8,
  },
  caption: {
    fontSize: 16,
    color: "#232323",
    fontWeight: "400",
    marginTop: 5,
    paddingHorizontal: 17,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 0,
    marginVertical: 0,
    overflow: "hidden",
    borderWidth: 1.3,
    borderColor: "#e6e9f2",
    shadowColor: "#beddfe",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 2,
    minHeight: 300,
  },
  postImageModal: {
    width: "100%",
    height: windowHeight * 0.35,
    backgroundColor: "#F5F5F5",
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    resizeMode: "cover",
    borderRadius: 14,
    marginTop: 5,
  },
  deleteBtn: {
    alignSelf: "center",
    marginTop: 13,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(34,51, 84, 0.19)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalSheet: {
    width: "100%",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: BG,
    paddingBottom: 20,
    minHeight: windowHeight * 0.65,
    maxHeight: windowHeight * 0.89,
    shadowColor: "#beddfe",
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 17,
    elevation: 10,
  },
  modalHeaderBar: {
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  modalHeaderIndicator: {
    width: 52,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#e5ecfa",
    marginBottom: 2,
    opacity: 0.7,
  },
});