import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const AddCat = ({ deleteCat, index, onCatPress }) => {
  return (
    <View
      style={{
        width: 90,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
      }}
    >
      <TouchableOpacity onPress={onCatPress}>
        <Image
          source={require("../assets/cat.png")}
          style={{
            width: 90,
            height: 90,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "red",
          borderRadius: 15,
          width: 20,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => deleteCat(index)}>
          <Text style={{ color: "white" }}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCat;
