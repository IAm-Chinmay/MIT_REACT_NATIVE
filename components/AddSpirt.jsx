import { View, FlatList, Button } from "react-native";
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
    <View style={{ flexDirection: "row" }}>
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
      <Button title="Add Cat" onPress={addNewCat} />
    </View>
  );
};

export default AddSprit;
