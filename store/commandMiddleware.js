import { EXECUTE_COMMANDS, updateCatPosition } from "../store/actions";

const ANIMATION_DURATION = 500;

const commandMiddleware = (store) => (next) => (action) => {
  if (action.type === EXECUTE_COMMANDS) {
    const state = store.getState();
    const { commands, selectedCatIndex, checked } = action.payload;

    if (
      selectedCatIndex.some((index) => index < 0 || index >= state.cats.length)
    ) {
      console.error("Invalid cat index in the selection:", selectedCatIndex);
      return next(action);
    }

    selectedCatIndex.forEach((index) => {
      executeCommandsSequentially(commands, index, store);
    });

    if (!checked) {
      return next({
        type: "SET_COMMANDS",
        payload: [],
      });
    }

    return next(action);
  }

  return next(action);
};

const executeCommandsSequentially = async (
  commands,
  selectedCatIndex,
  store
) => {
  let currentCat = store.getState().cats[selectedCatIndex];

  if (!currentCat) {
    console.error("Current cat is undefined:", selectedCatIndex);
    return;
  }

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    await executeCommandWithAnimation(
      command,
      selectedCatIndex,
      currentCat,
      store
    );
    currentCat = store.getState().cats[selectedCatIndex];
  }
};

const executeCommandWithAnimation = (
  command,
  selectedCatIndex,
  currentCat,
  store
) => {
  return new Promise((resolve) => {
    const [action, direction, distanceStr] = command.command.split(" ");
    const distance = parseInt(distanceStr, 10);

    let targetX = currentCat.x;
    let targetY = currentCat.y;

    switch (direction) {
      case "left":
        targetX -= distance;
        break;
      case "right":
        targetX += distance;
        break;
      case "up":
        targetY -= distance;
        break;
      case "down":
        targetY += distance;
        break;
      default:
        console.error("Invalid direction:", direction);
        resolve();
        return;
    }

    const startTime = Date.now();
    const startX = currentCat.x;
    const startY = currentCat.y;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      const newX = startX + (targetX - startX) * eased;
      const newY = startY + (targetY - startY) * eased;

      store.dispatch(
        updateCatPosition(selectedCatIndex, {
          x: Math.round(newX),
          y: Math.round(newY),
        })
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animate);
  });
};

export default commandMiddleware;
