export default class Utils {
  static currency = "XAF";
  static lang = "fr-FR";
  
  /**
   * Formats a given number of seconds into a human-readable time format.
   *
   * @param {number} secsNumber - The number of seconds to be formatted.
   * @return {string} - The formatted time string.
   */
  static formatTime(secsNumber) {
    const days = Math.floor(secsNumber / 86400);
    const hours = Math.floor((secsNumber % 86400) / 3600);
    const minutes = Math.floor((secsNumber % 3600) / 60);
    const seconds = secsNumber % 60;

    let res = "";
    if (days > 0) res += `${days} jrs, `;
    if (hours > 0) res += `${hours} hrs, `;
    if (minutes > 0) res += `${minutes} mins et `;
    res += `${seconds} secs`;

    return res.trim();
  }

  /**
   * Formats a number as a currency string.
   *
   * @param {Object} options - The options for formatting the number.
   * @param {number} options.number - The number to format.
   * @param {string} options.currency - The currency to use for formatting. If not provided, the default currency from Utils will be used.
   * @param {string} options.lang - The language to use for formatting. If not provided, the default language from Utils will be used.
   * @return {string} The formatted number as a currency string.
   */
  static formatNumber({ number, currency, lang }) {
    return new Intl.NumberFormat(lang || Utils.lang, {
      style: "currency",
      currency: currency || Utils.currency,
    }).format(number);
  }
}
