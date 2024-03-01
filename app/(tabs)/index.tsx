import {
  Dimensions,
  FlatList,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import PostCard from "@/components/PostCard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tintColorWarmBackground } from "@/constants/Colors";
import { Post_API } from "@/types/Post";

export default function TabOneScreen() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyapi.io/data/v1/post", {
        headers: {
          "app-id": "65e1c041123e6e2df7b3b45e",
        },
        params: {
          page: page,
        },
      });
      if (page === 1) {
        setPosts(response.data.data);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data.data] as any);
      }
      setHasMorePosts(response.data.data.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMorePosts) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <SafeAreaProvider style={styles.listContainer}>
      <FlatList
        data={posts}
        renderItem={({ item }: { item: Post_API }) => (
          <View style={styles.container}>
            <PostCard
              imageUrl={item.image || "No Image"}
              text={item.text || "No text available"} 
              ownerName={
                item.owner && item.owner.firstName && item.owner.lastName
                  ? `${item.owner.firstName} ${item.owner.lastName}`
                  : "Unknown Owner"
              } 
              creationDate={
                item.publishDate
                  ? formatDistanceToNow(new Date(item.publishDate), {
                      addSuffix: true,
                    })
                  : "Unknown Date"
              } 
              tags={item.tags || []}
              likes={item.likes || 0}
            />
          </View>
        )}
        testID="flat"
        keyExtractor={(item) => item.text + item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100,
    maxHeight: 200,
    height: 150,
    padding: 10,
    width: Dimensions.get("screen").width,
    marginVertical: 10,
  },
  postsContainer: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    height: "100%",
    backgroundColor: tintColorWarmBackground,
  },
});
