import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { addCommand, executeCommands, deleteCommand } from "../store/actions";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;

const availableCommands = [
  "go left 50",
  "go right 50",
  "go up 50",
  "go down 50",
];

const Commands = ({ route }) => {
  const dispatch = useDispatch();
  const droppedCommands = useSelector((state) => state.commands);
  const selectedCatIndex = route.params?.selectedCatIndex;
  const [draggingCommand, setDraggingCommand] = useState(null);
  const [dragPosition] = useState(new Animated.ValueXY());

  const handleGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: dragPosition.x,
          translationY: dragPosition.y,
        },
      },
    ],
    { useNativeDriver: false }
  );

  const handleGestureStateChange = (event, command) => {
    if (event.nativeEvent.state === State.BEGAN) {
      setDraggingCommand(command);
    } else if (event.nativeEvent.state === State.END) {
      const dropZoneX = event.nativeEvent.absoluteX;

      if (dropZoneX > SCREEN_WIDTH / 2) {
        handleDropCommand(draggingCommand, selectedCatIndex);
      }

      dragPosition.setValue({ x: 0, y: 0 });
      setDraggingCommand(null);
    }
  };

  const handleDropCommand = (command, selectedCatId) => {
    dispatch(
      addCommand({
        id: Math.random().toString(),
        command,
        catId: selectedCatId,
      })
    );
  };

  const handleExecuteAllCommands = () => {
    if (selectedCatIndex !== null) {
      dispatch(executeCommands(selectedCatIndex));
    }
  };

  const handleDeleteCommand = (id) => {
    dispatch(deleteCommand(id));
  };

  const renderDraggableCommand = (command) => (
    <PanGestureHandler
      key={command}
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={(event) => handleGestureStateChange(event, command)}
    >
      <Animated.View
        style={[
          styles.commandItem,
          {
            transform:
              draggingCommand === command
                ? [
                    { translateX: dragPosition.x },
                    { translateY: dragPosition.y },
                  ]
                : [],
          },
        ]}
      >
        <Text style={styles.commandText}>{command}</Text>
      </Animated.View>
    </PanGestureHandler>
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.sectionTitle}>Available Commands</Text>
        {availableCommands.map((command) => renderDraggableCommand(command))}
      </View>
      <View style={styles.rightSection}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Drop Commands
        </Text>
        <View
          style={{
            height: "50%",
            borderWidth: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={styles.sectionTitle}>Action 1</Text>
          <DraggableFlatList
            data={droppedCommands}
            renderItem={({ item, drag, isActive }) => (
              <TouchableOpacity
                onLongPress={drag}
                style={[styles.droppedCommand, isActive && styles.active]}
              >
                <TouchableOpacity
                  onPress={() => handleDeleteCommand(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.commandText}>{item.command}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => {
              dispatch({
                type: "SET_COMMANDS",
                payload: data,
              });
            }}
          />
        </View>
        <View
          style={{
            height: "45%",
            borderWidth: 1,
            width: "100%",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={styles.sectionTitle}>Action 2</Text>
          <DraggableFlatList
            data={droppedCommands}
            renderItem={({ item, drag, isActive }) => (
              <TouchableOpacity
                onLongPress={drag}
                style={[styles.droppedCommand, isActive && styles.active]}
              >
                <TouchableOpacity
                  onPress={() => handleDeleteCommand(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.commandText}>{item.command}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => {
              dispatch({
                type: "SET_COMMANDS",
                payload: data,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
  },
  leftSection: {
    width: "50%",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  rightSection: {
    width: "50%",
    backgroundColor: "#e0e0e0",
    padding: 10,
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commandItem: {
    backgroundColor: "lightblue",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    zIndex: 1000,
  },
  droppedCommand: {
    backgroundColor: "lightgreen",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
    position: "relative",
  },
  commandText: {
    color: "black",
    fontWeight: "600",
  },
  deleteButton: {
    position: "absolute",
    right: -2,
    top: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  active: {
    borderColor: "blue",
    borderWidth: 2,
  },
  executeButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  executeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Commands;
