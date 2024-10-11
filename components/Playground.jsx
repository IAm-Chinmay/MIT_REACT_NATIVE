import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DraggableBox from "./DraggableBox";
import { updateCatPosition, executeCommands } from "../store/actions";
import { RadioButton } from "react-native-paper";
const Playground = () => {
  const cats = useSelector((state) => state.cats);
  const commands = useSelector((state) => state.commands);
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(true);
  const [selectedCats, setSelectedCats] = React.useState([]);

  const screenWidth = Dimensions.get("window").width;
  const playgroundHeight = 600;
  const catSize = 90;

  const handleUpdateCatPosition = (index, newX, newY) => {
    const boundedX = Math.max(
      0,
      Math.min(Number(newX) || 0, screenWidth - catSize)
    );
    const boundedY = Math.max(
      0,
      Math.min(Number(newY) || 0, playgroundHeight - catSize)
    );

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
      dispatch(executeCommands(commands, selectedIndices, checked));
    } else {
      console.warn("No commands or cats available for execution.");
    }
  };

  const handleCatSelection = (index) => {
    setSelectedCats((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
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
              position={{
                x: Number(item.x) || 0,
                y: Number(item.y) || 0,
              }}
              updateCatPosition={handleUpdateCatPosition}
              index={index}
              isSelected={selectedCats.includes(index)}
              onSelect={() => handleCatSelection(index)}
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
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <RadioButton.Group
          onValueChange={(newValue) => {
            console.log(newValue);
            setChecked(newValue);
          }}
          value={checked}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#ADD8E6",
                width: 180,
                borderRadius: 10,
              }}
            >
              <RadioButton
                value={true}
                disabled={commands.length === 0 || cats.length === 0}
              />
              <Text>Retain Commands</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFCCCB",
                width: 180,
                borderRadius: 10,
              }}
            >
              <RadioButton
                value={false}
                disabled={commands.length === 0 || cats.length === 0}
              />
              <Text>Clear Commands</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default Playground;
