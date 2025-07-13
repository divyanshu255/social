
import { useEffect, useState, useRef } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  TextInput, StyleSheet, Alert, SafeAreaView, ScrollView, Platform, StatusBar
} from "react-native";
import API from "../../lib/axios";
import { getToken } from "../../lib/secureStore";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const BLUE = "#2776ea";
const RED = "#E23D3D";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(defaultAvatar);
  const [currentUserName, setCurrentUserName] = useState("");
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const modalScrollRef = useRef(null);

  const fetchUserId = async () => {
    const token = await getToken();
    try {
      const res = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUserId(res.data._id);
      setCurrentUserAvatar(res.data.avatar || defaultAvatar);
      setCurrentUserName(res.data.name || "");
    } catch (err) {
      console.error("User fetch error", err);
    }
  };

  const fetchPosts = async () => {
    const token = await getToken();
    try {
      const res = await API.get("/posts/feed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
      if (selectedPost) {
        const updated = res.data.find((p) => p._id === selectedPost._id);
        if (updated) setSelectedPost(updated);
      }
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  // Persistent like toggle
  const toggleLike = async (postId) => {
    setPosts(prev =>
      prev.map(post => {
        if (post._id === postId) {
          const likesArray = Array.isArray(post.likes) ? post.likes : [];
          const hasLiked = likesArray.includes(currentUserId);
          const updatedLikes = hasLiked
            ? likesArray.filter(id => id !== currentUserId)
            : [...likesArray, currentUserId];
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
    if (selectedPost && selectedPost._id === postId) {
      const likesArray = Array.isArray(selectedPost.likes) ? selectedPost.likes : [];
      const hasLiked = likesArray.includes(currentUserId);
      const updatedLikes = hasLiked
        ? likesArray.filter(id => id !== currentUserId)
        : [...likesArray, currentUserId];
      setSelectedPost({ ...selectedPost, likes: updatedLikes });
    }
    const token = await getToken();
    try {
      await API.post(`/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error("Like error", err);
    }
  };

  // Post comment, do not close modal, update comments in modal instantly
  const postComment = async () => {
    const token = await getToken();
    const text = commentText.trim();
    if (!text || !selectedPost) return;
    try {
      const res = await API.post(`/posts/${selectedPost._id}/comment`, { text }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentText("");
      fetchPosts();
      if (res?.data && res.data._id) {
        setSelectedPost(prev =>
          prev
            ? {
                ...prev,
                comments: [
                  ...prev.comments,
                  { ...res.data, user: { ...res.data.user, avatar: currentUserAvatar } },
                ],
              }
            : prev
        );
      }
    } catch (err) {
      console.error("Comment error", err);
    }
  };

  const deleteComment = async (postId, commentId) => {
    Alert.alert("Delete Comment", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const token = await getToken();
          try {
            await API.delete(`/posts/${postId}/comment/${commentId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts();
          } catch (err) {
            console.error("Delete comment error", err);
          }
        },
      },
    ]);
  };

  const deletePost = async (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const token = await getToken();
          try {
            await API.delete(`/posts/${postId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts();
            setSelectedPost(null);
          } catch (err) {
            console.error("Delete post error", err);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserId();
      fetchPosts();
    }
    // eslint-disable-next-line
  }, [isFocused]);

  const renderPostCard = ({ item }) => {
    const likedByUser = (item.likes || []).includes(currentUserId);

    return (
      <View style={styles.feedCardShadow}>
        <View style={styles.card}>
          {/* Post header */}
          <View style={styles.postHeader}>
            <Image
              source={{ uri: item.creator.avatar || defaultAvatar }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.author}>{item.creator.name}</Text>
              <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </Text>
            </View>
          </View>
          <Text style={styles.caption}>{item.caption}</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedPost(item)}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => toggleLike(item._id)} style={styles.actionBtn}>
              <AntDesign name={likedByUser ? "heart" : "hearto"} size={22} color={likedByUser ? RED : "#888"} />
              <Text style={[styles.actionCount, likedByUser && { color: RED, fontWeight: "600" }]}>{item.likes?.length || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome name="comment-o" size={21} color="#888" />
              <Text style={styles.actionCount}>{item.comments?.length || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.shareIcon}>↗</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Get likedByUser for modal post
  const likedByUserModal = selectedPost && (selectedPost.likes || []).includes(currentUserId);

  // Profile navigation
  const goToProfile = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("profile");
      // If using Expo Router, use: router.push("/profile");
    }
  };

  // Detect scroll up/down in modal and close
  const handleModalScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (Math.abs(y) > 20) { // threshold: user scrolled up or down
      setSelectedPost(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <StatusBar barStyle="dark-content" backgroundColor={BLUE} />
      <View style={styles.feedHeaderRow}>
        <Text style={styles.feedHeaderTitle}>Bondly</Text>
        <View style={styles.feedHeaderIcons}>
          {/* User's name to left of avatar */}
          <Text style={styles.currentUserName} numberOfLines={1}>{currentUserName}</Text>
          <TouchableOpacity style={styles.feedProfileBtn} onPress={goToProfile}>
            <Image source={{ uri: currentUserAvatar }} style={styles.feedProfileAvatar} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderPostCard}
        contentContainerStyle={{ padding: 0, paddingBottom: 22 }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      />

      {/* Modal for post details/comments */}
      <Modal 
        isVisible={!!selectedPost} 
        onBackdropPress={() => setSelectedPost(null)}
        onBackButtonPress={() => setSelectedPost(null)}
        style={styles.modal}
        backdropOpacity={0.25}
        useNativeDriver
        hideModalContentWhileAnimating
        avoidKeyboard
        propagateSwipe
      >
        {selectedPost && (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            onScroll={handleModalScroll}
            scrollEventThrottle={16}
            ref={modalScrollRef}
          >
            <View style={styles.modalContent}>
              <View style={styles.card}>
                <View style={styles.postHeader}>
                  <Image
                    source={{ uri: selectedPost.creator.avatar || defaultAvatar }}
                    style={styles.avatar}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.author}>{selectedPost.creator.name}</Text>
                    <Text style={styles.date}>
                      {new Date(selectedPost.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Text>
                  </View>
                </View>
                <Text style={styles.caption}>{selectedPost.caption}</Text>
                <Image source={{ uri: selectedPost.imageUrl }} style={styles.image} />
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => toggleLike(selectedPost._id)} style={styles.actionBtn}>
                    <AntDesign name={likedByUserModal ? "heart" : "hearto"} size={22} color={likedByUserModal ? RED : "#888"} />
                    <Text style={[styles.actionCount, likedByUserModal && { color: RED, fontWeight: "600" }]}>{selectedPost.likes?.length || 0}</Text>
                  </TouchableOpacity>
                  <View style={styles.actionBtn}>
                    <FontAwesome name="comment-o" size={21} color="#888" />
                    <Text style={styles.actionCount}>{selectedPost.comments?.length || 0}</Text>
                  </View>
                  <View style={styles.actionBtn}>
                    <Text style={styles.shareIcon}>↗</Text>
                  </View>
                </View>
                {/* Comment input */}
                <View style={styles.commentInputRow}>
                  <TextInput
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholder="Type comment..."
                    placeholderTextColor="#BABABA"
                    style={styles.commentInput}
                  />
                  <TouchableOpacity onPress={postComment} style={styles.sendBtnWrapper}>
                    <Text style={styles.sendBtn}>➤</Text>
                  </TouchableOpacity>
                </View>

                {/* Comments */}
                <View style={styles.commentList}>
                  {selectedPost.comments.map((comment) => (
                    <View key={comment._id} style={styles.commentRow}>
                      <Image
                        source={{ uri: comment.user.avatar || defaultAvatar }}
                        style={styles.commentAvatar}
                      />
                      <View style={styles.commentInfo}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={styles.commentAuthor}>{comment.user.name}</Text>
                          <Text style={styles.commentDate}>· {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</Text>
                        </View>
                        <Text style={styles.commentText}>{comment.text}</Text>
                      </View>
                      {comment.user._id === currentUserId && (
                        <TouchableOpacity onPress={() => deleteComment(selectedPost._id, comment._id)}>
                          <MaterialIcons name="delete" size={22} color="#B71C1C" />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>

                {selectedPost.creator._id === currentUserId && (
                  <TouchableOpacity onPress={() => deletePost(selectedPost._id)}>
                    <Text style={styles.deletePostBtn}>🗑️ Delete Post</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // FEED HEADER
  feedHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 21,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 8 : 44,
    paddingBottom: 13,
    backgroundColor: "#F7F7F7",
  },
  feedHeaderTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: BLUE,
    letterSpacing: 0.1,
  },
  feedHeaderIcons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  currentUserName: {
    color: "#1a1a1a",
    fontWeight: "700",
    fontSize: 15.5,
    marginRight: 10,
    maxWidth: 120,
  },
  feedProfileBtn: {
    marginLeft: 0,
    backgroundColor: "#fff",
    borderRadius: 17,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F0F0F0",
    overflow: "hidden",
  },
  feedProfileAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  // FEED CARD
  feedCardShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 2,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 19,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 19,
    overflow: "hidden",
    padding: 0,
    marginBottom: 8,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 4,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 41,
    height: 41,
    borderRadius: 20.5,
    marginRight: 11,
    backgroundColor: "#F0F0F0"
  },
  author: {
    fontWeight: "700",
    fontSize: 15.9,
    color: "#252525",
    marginBottom: 0,
  },
  date: {
    fontSize: 13.5,
    color: "#888",
    fontWeight: "400",
    marginTop: 2,
  },
  caption: {
    marginTop: 2,
    marginBottom: 7,
    fontSize: 15,
    paddingHorizontal: 15,
    color: "#232323",
    fontWeight: "400"
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    backgroundColor: "#F6F6F7",
    marginBottom: 0,
    marginTop: 0,
    alignSelf: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 2,
    backgroundColor: "#fff",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    gap: 3,
  },
  actionCount: {
    fontSize: 16,
    color: "#888",
    marginLeft: 4,
    fontWeight: "500"
  },
  shareIcon: {
    fontSize: 19,
    color: "#888",
    fontWeight: "500",
    marginTop: 1,
    marginLeft: 2,
  },

  // MODAL
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#F7F7F7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: "60%",
    paddingBottom: 16,
    paddingTop: 16,
    paddingHorizontal: 0,
    flexGrow: 1,
  },

  // COMMENT
  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 11,
    marginBottom: 2,
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 13,
    paddingHorizontal: 16,
    height: 44,
    backgroundColor: "#fff",
    fontSize: 15.2,
    color: "#222",
  },
  sendBtnWrapper: {
    backgroundColor: "#E6F5EC",
    borderRadius: 23,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 9,
  },
  sendBtn: {
    fontSize: 23,
    color: "#28C47C",
    fontWeight: "bold",
    marginLeft: 2,
  },
  commentList: {
    marginTop: 8,
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 14,
    marginBottom: 8,
    paddingVertical: 7,
    paddingHorizontal: 8,
    minHeight: 46,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#E0E0E0",
  },
  commentInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  commentAuthor: {
    fontWeight: "600",
    fontSize: 15.3,
    color: "#242424",
    marginRight: 4,
  },
  commentDate: {
    fontSize: 13.1,
    color: "#A2A2A2",
    marginLeft: 4,
    fontWeight: "400"
  },
  commentText: {
    fontSize: 14.5,
    color: "#232323",
    fontWeight: "400",
    marginTop: 1,
  },
  deletePostBtn: {
    color: "#E23D3D",
    marginTop: 12,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600"
  },
});