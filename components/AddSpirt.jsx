import { View, FlatList, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AddCat from "./AddCat";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const AddSprit = ({ addNewCat, deleteCat }) => {
  const cats = useSelector((state) => state.cats);
  const navigation = useNavigation();
  const [selectedCatIndex, setSelectedCatIndex] = useState(null);

  const handleCatPress = (index) => {
    setSelectedCatIndex(index);
    navigation.navigate("Commands", { selectedCatIndex: index });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        marginVertical: 10,
        alignItems: "center",
        height: 100,
      }}
    >
      <FlatList
        data={cats}
        renderItem={({ item, index }) => (
          <View style={{ width: 100 }}>
            <AddCat
              index={index}
              deleteCat={deleteCat}
              onCatPress={() => handleCatPress(index)}
            />
          </View>
        )}
        horizontal
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#90EE90",
          width: "20%",
          height: 50,
          marginRight: 10,
          justifyContent: "center",
          borderRadius: 10,
        }}
        onPress={addNewCat}
      >
        <Text
          style={{
            textAlign: "center",
          }}
        >
          Add Cat
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSprit;
