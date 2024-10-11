import React, { useRef, useState } from "react";
import { View, Image, PanResponder, Pressable } from "react-native";

const DraggableBox = ({ position, updateCatPosition, index, isSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const initialX = Number(position?.x) || 0;
  const initialY = Number(position?.y) || 0;
  const lastPositionRef = useRef({
    x: initialX,
    y: initialY,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        setIsDragging(true);
        lastPositionRef.current = {
          x: Number(position.x) || 0,
          y: Number(position.y) || 0,
        };
      },

      onPanResponderMove: (_, gestureState) => {
        const newX = lastPositionRef.current.x + gestureState.dx || 0;
        const newY = lastPositionRef.current.y + gestureState.dy || 0;
        if (!isNaN(newX) && !isNaN(newY)) {
          updateCatPosition(index, newX, newY);
        }
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

  const styleLeft = Number(position?.x) || 0;
  const styleTop = Number(position?.y) || 0;

  return (
    <Pressable>
      <View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          left: styleLeft,
          top: styleTop,
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
