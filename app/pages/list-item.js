import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 8,
  },
  text: {
    fontSize: 18,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
  },
});

const ListItem = ({ item }) => (
  <View style={styles.itemContainer}>
    {item.type === 'text' &&
      <Text style={styles.text}>{item.data}</Text>
    }
    {item.type === 'image' &&
      <Image style={styles.image} source={item.data} />
    }
    {item.type === 'button' &&
      <Button title={item.data} onPress={item.onPress} />
    }
  </View>
);

export default ListItem;
