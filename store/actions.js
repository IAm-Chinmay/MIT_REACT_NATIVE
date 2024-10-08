export const ADD_CAT = "ADD_CAT";
export const UPDATE_CAT_POSITION = "UPDATE_CAT_POSITION";
export const DELETE_CAT = "DELETE_CAT";
export const SET_COMMANDS = "SET_COMMANDS";
export const ADD_COMMAND = "ADD_COMMAND";
export const EXECUTE_COMMANDS = "EXECUTE_COMMANDS";
export const DELETE_COMMAND = "DELETE_COMMAND";
export const COMMANDS_EXECUTION_COMPLETE = "COMMANDS_EXECUTION_COMPLETE";

export const addCat = (cat) => ({
  type: ADD_CAT,
  payload: cat,
});

export const updateCatPosition = (index, newPosition) => ({
  type: UPDATE_CAT_POSITION,
  payload: { index, newPosition },
});

export const deleteCat = (id) => ({
  type: DELETE_CAT,
  payload: id,
});

export const addCommand = (command) => ({
  type: ADD_COMMAND,
  payload: command,
});

export const executeCommands = (commands, selectedCatIndex) => ({
  type: EXECUTE_COMMANDS,
  payload: { commands, selectedCatIndex },
});

export const deleteCommand = (id) => ({
  type: DELETE_COMMAND,
  payload: id,
});
