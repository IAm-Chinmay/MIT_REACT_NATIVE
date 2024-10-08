import React, { useRef, useState } from "react";
import { View, Image, PanResponder, Pressable } from "react-native";

const DraggableBox = ({ position, updateCatPosition, index, isSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastPositionRef = useRef({ x: position.x, y: position.y });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        setIsDragging(true);
        lastPositionRef.current = {
          x: position.x,
          y: position.y,
        };
      },

      onPanResponderMove: (_, gestureState) => {
        const newX = lastPositionRef.current.x + gestureState.dx;
        const newY = lastPositionRef.current.y + gestureState.dy;
        updateCatPosition(index, newX, newY);
      },

      onPanResponderRelease: () => {
        setIsDragging(false);
        // if (!isDragging) {
        //   onSelect();
        // }
      },

      onPanResponderTerminate: () => {
        setIsDragging(false);
      },
    })
  ).current;

  return (
    <Pressable>
      <View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: 90,
          height: 90,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderWidth: isSelected ? 2 : 0,
            borderColor: "green",
            borderRadius: 45,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../assets/cat.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default DraggableBox;
