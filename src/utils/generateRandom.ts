// generate random uuid

import {} from "crypto";

export const generateRandomColor = (level: number) => {
  const colors = [
    "#FFFFFF",
    "#AF6033",
    "#FF33FF",
    "#0FFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
  ];
  return colors[level];
};

export const generateRandomId = () => {
  const uniqueId = Date.now().toString() + Math.random().toString(36);
  return uniqueId;
};
