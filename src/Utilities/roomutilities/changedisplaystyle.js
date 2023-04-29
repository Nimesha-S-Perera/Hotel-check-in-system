export const changedisplaystyle = (data) => {
  const aa = data.map((item) => {
    if (item.status == 1) {
      item.status = "Booked";
    } else {
      item.status = "Available";
    }
    if (item.roomType == 1) {
      item.roomType = "Deluxe";
    } else {
      item.roomType = "Standard";
    }
    if (item.outoforder == 1) {
      item.outoforder = true;
      item.status = "Unavailable";
    } else {
      item.outoforder = false;
    }
    return { ...item };
  });
  return aa;
};
