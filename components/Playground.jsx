import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DraggableBox from "./DraggableBox";
import { updateCatPosition, executeCommands } from "../store/actions";

const Playground = () => {
  const cats = useSelector((state) => state.cats);
  const commands = useSelector((state) => state.commands);
  const dispatch = useDispatch();

  const screenWidth = Dimensions.get("window").width;
  const playgroundHeight = 600;
  const catSize = 90;

  const handleUpdateCatPosition = (index, newX, newY) => {
    const boundedX = Math.max(0, Math.min(newX, screenWidth - catSize));
    const boundedY = Math.max(0, Math.min(newY, playgroundHeight - catSize));

    dispatch(
      updateCatPosition(index, {
        x: boundedX,
        y: boundedY,
      })
    );
  };

  const handleExecute = () => {
    if (commands.length > 0 && cats.length > 0) {
      const selectedIndices = cats.map((_, index) => index);
      console.log("SI : ", selectedIndices);
      console.log("Current Cats:", cats);
      dispatch(executeCommands(commands, selectedIndices));
    } else {
      console.warn("No commands or cats available for execution.");
    }
  };

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: playgroundHeight,
          borderWidth: 2,
          borderColor: "blue",
          backgroundColor: "rgba(200, 200, 255, 0.3)",
          position: "relative",
        }}
      >
        {cats.length > 0 ? (
          cats.map((item, index) => (
            <DraggableBox
              key={item.id}
              position={{ x: item.x, y: item.y }}
              updateCatPosition={handleUpdateCatPosition}
              index={index}
            />
          ))
        ) : (
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -50 }, { translateY: -10 }],
            }}
          >
            <Text>No cats added yet!</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor:
            commands.length > 0 && cats.length > 0 ? "green" : "#aaa",
          width: 80,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          top: 10,
          right: 0,
          borderRadius: 5,
        }}
        onPress={handleExecute}
        disabled={commands.length === 0 || cats.length === 0}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>Execute</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Playground;
