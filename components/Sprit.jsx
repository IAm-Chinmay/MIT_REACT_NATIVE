import { View, Text } from "react-native";
import React from "react";

const Sprit = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "10%",
        borderWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontWeight: 600,
          }}
        >
          Sprit
        </Text>
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Text>Cat</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            marginRight: 20,
          }}
        >
          X 10
        </Text>
        <Text>Y 10</Text>
      </View>
    </View>
  );
};

export default Sprit;
