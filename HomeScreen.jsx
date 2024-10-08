import { View } from "react-native";
import React from "react";
import Playground from "./components/Playground";
import AddSpirt from "./components/AddSpirt";
import { useDispatch, useSelector } from "react-redux";
import { addCat, deleteCat } from "./store/actions";
import Sprit from "./components/Sprit";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const cats = useSelector((state) => state.cats);

  const addNewCat = () => {
    const newCat = {
      id: Math.random(),
      x: 0,
      y: 0,
    };
    dispatch(addCat(newCat));
  };

  const handleDeleteCat = (index) => {
    const catToDelete = cats[index];
    dispatch(deleteCat(catToDelete.id));
  };

  return (
    <View>
      <Playground cats={cats} />
      <Sprit />
      <AddSpirt addNewCat={addNewCat} deleteCat={handleDeleteCat} />
    </View>
  );
};

export default HomeScreen;
