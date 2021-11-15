const getRandomElement = arr => {
    if (!Array.isArray(arr)) throw new Error("Array Expected");
    return arr[Math.floor(Math.random() * arr.length)];
  };


  module.exports = { getRandomElement };