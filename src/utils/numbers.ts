export default (length: number) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const numberFormatter = (num: number, len: number) => {
  let newNumber = num.toString();
  const diff = len - newNumber.length;
  for (let index = 0; index < diff; index++) {
    newNumber = "0" + newNumber;
  }
  return newNumber
};
