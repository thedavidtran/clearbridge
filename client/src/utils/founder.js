/** Founder related utility functions */

/**
 * Generates the founder summary caption.
 * @param {string} name Founder full name.
 * @param {string} title Founder title.
 * @returns {string}
 */
const getFounderSummaryCaption = ({ name, title }) => {
  return `${name} : Founder & ${title}`;
};
const founderLib = {
  getFounderSummaryCaption,
};

export default founderLib;
