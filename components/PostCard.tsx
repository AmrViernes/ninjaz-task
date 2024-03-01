import { Dimensions, StyleSheet, Text, Image } from "react-native";
import React from "react";
import { View } from "./Themed";
import { tintColorColdBackground, tintColorDisabled, tintColorPrimary, tintColorSecondary } from "@/constants/Colors";
import { Post } from "@/types/Post";

const PostCard = (props: Post) => {
  return (
    <View style={styles.cardContainer}>
      <Image style={styles.imageContainer} source={{ uri: props.imageUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.orderTitle}>{props.text}</Text>
        <Text style={styles.orderStatus}>{props.ownerName}</Text>
        <Text style={styles.orderStatus}>{props.creationDate.toString()}</Text>
        <Text style={styles.orderItemsCount}>Likes Count: {props.likes}</Text>
        <View style={styles.tagsContainer}>
        {props.tags.map((tag, index) => (
          <Text style={styles.orderStatus} key={index}>{tag.toUpperCase()}</Text>
        ))}
        </View>
      </View>
    </View>
  );
};

export  default PostCard;

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row', 
    borderRadius: 10,
    backgroundColor: tintColorDisabled,
    shadowColor: tintColorPrimary,
    width: '95%',
    padding: 10, 
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: tintColorDisabled,
    gap: 2
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 10, 
    borderRadius: 10, 
  },
  textContainer: {
    flex: 1, 
    backgroundColor: tintColorDisabled,
  },
  orderTitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 11,
    color: tintColorColdBackground,
    backgroundColor: tintColorPrimary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 5, 
    opacity: 0.9,
  },
  orderItemsCount: {
    fontSize: 10,
    color: tintColorPrimary,
    backgroundColor: tintColorSecondary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 5,
    width: '50%'
  },
});
