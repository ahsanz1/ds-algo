function rabbitIsAt(holes, position) {
  // Replace this with your actual condition to check if the rabbit is at the given position
  // For example, if the rabbit is at the 3rd hole: return holes[position] === 'Rabbit';
  return position === 2;
}

function rabbitCanMoveTo(holes, position) {
  // Replace this with your actual condition to check if the rabbit can move to the given position
  // For example, if the rabbit can move to the right: return position < holes.length - 1;
  return position < holes.length - 1;
}

function findRabbit(holes) {
  let low = 0;
  let high = holes.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    console.log("Checking hole at position:", mid);

    // Check if the rabbit is at the current position
    if (rabbitIsAt(holes, mid)) {
      console.log("Found the rabbit at position:", mid);
      return mid;
    }

    // Adjust the search range based on the rabbit's potential move
    if (rabbitCanMoveTo(holes, mid)) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  // This line should not be reached if the rabbit is found
  console.log("Rabbit not found!");
  return -1;
}

// Example usage with 10 holes
const holes = new Array(10).fill(0);
// Place the rabbit in the 3rd hole
holes[2] = "Rabbit";

findRabbit(holes);
