class MathUtils {
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  /**
   * Determines if date1 is after date2.
   *
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @return {boolean} True if date1 is after date2, false otherwise.
   */
  static isAfter(date1, date2) {
    return date1.getTime() > date2.getTime();
  }
}

module.exports = { MathUtils };
