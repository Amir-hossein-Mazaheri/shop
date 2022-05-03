export function lowInventoryMessage(inventory: number) {
  if (inventory < 5 && inventory > 3) {
    return "Less Than 5 Left";
  } else if (inventory < 3 && inventory > 1) {
    return "Less Than 3 Left";
  } else if (inventory === 1) {
    return "Only 1 Left";
  }
}

export function inventoryStatusMessage(
  inventoryStatus: "S" | "O",
  inventory: number
) {
  switch (inventoryStatus) {
    case "S":
      return lowInventoryMessage(inventory);
    case "O":
      return "Out of Stock";
    default:
      return "";
  }
}
