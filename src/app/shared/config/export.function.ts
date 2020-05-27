export function color(i) {
  if (!i) {
    return "black";
  }
  let str: string = String(i);
  if (str.length > 1) {
    str = str.substring(0, 1);
  }
  if (str == '1') {
    return "#FFFF00";
  } else if (str == '2') {
    return "#EC407A";
  } else if (str == '3') {
    return "#4DD0E1";
  } else if (str == '4') {
    return "#4CAF50";
  } else if (str == '5') {
    return "#AEEA00";
  } else if (str == '6') {
    return "#FF5722";
  } else if (str == '7') {
    return "#FFAB00";
  } else if (str == '8') {
    return "#4054B2";
  } else if (str == '9') {
    return "#CDDC39";
  } else if (str == '0') {
    return "#9575CD";
  }
}
