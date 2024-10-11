import { View, ScrollView } from "react-native";
import React from "react";
import Playground from "./components/Playground";
import AddSpirt from "./components/AddSpirt";
import { useDispatch, useSelector } from "react-redux";
import { addCat, deleteCat } from "./store/actions";
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
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <Playground cats={cats} />
      <AddSpirt addNewCat={addNewCat} deleteCat={handleDeleteCat} />
    </ScrollView>
  );
};

export default HomeScreen;
