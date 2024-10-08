import {
  ADD_CAT,
  UPDATE_CAT_POSITION,
  DELETE_CAT,
  SET_COMMANDS,
  ADD_COMMAND,
  EXECUTE_COMMANDS,
  DELETE_COMMAND,
} from "./actions";

const initialState = {
  cats: [],
  commands: [],
};

const catReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAT:
      return { ...state, cats: [...state.cats, action.payload] };

    case UPDATE_CAT_POSITION:
      const updatedCats = state.cats.map((cat, index) =>
        index === action.payload.index
          ? { ...cat, ...action.payload.newPosition }
          : cat
      );
      return { ...state, cats: updatedCats };

    case DELETE_CAT:
      return {
        ...state,
        cats: state.cats.filter((cat) => cat.id !== action.payload),
      };

    case SET_COMMANDS:
      return {
        ...state,
        commands: action.payload,
      };

    case ADD_COMMAND:
      return {
        ...state,
        commands: [...state.commands, action.payload],
      };

    case EXECUTE_COMMANDS:
      const commandsToExecute = action.payload;
      let newState = { ...state };

      commandsToExecute.forEach((command) => {
        const [actionType, distanceStr] = command.command.split(" ");
        const distance = parseInt(distanceStr, 10);

        newState.cats.forEach((cat) => {
          let newX = 0,
            newY = 0;

          if (actionType === "go") {
            if (command.command.includes("left")) {
              newX = -distance;
            } else if (command.command.includes("right")) {
              newX = distance;
            } else if (command.command.includes("up")) {
              newY = -distance;
            } else if (command.command.includes("down")) {
              newY = distance;
            }

            if (cat) {
              cat.x += newX;
              cat.y += newY;
            } else {
              console.error("Current cat is undefined.");
            }
          }
        });
      });

      return {
        ...newState,
        commands: [],
      };

    case DELETE_COMMAND:
      return {
        ...state,
        commands: state.commands.filter((cmd) => cmd.id !== action.payload),
      };
    default:
      return state;
  }
};

export default catReducer;
