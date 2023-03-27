/** Company related utility functions */

/**
 * @typedef {object} Company
 * @prop {string} id Company identifier.
 * @prop {string} name Company name.
 * @prop {Location} location Company location.
 * @prop {string} description Company description text.
 */

/**
 * @typedef {object} Location
 * @prop {string} city City name.
 * @prop {string} state State abbreviation.
 */

/**
 * Generates the location string from the given location object.
 * @param {Location} location Location to generate the string from
 * @returns {string} Shortened location string.
 */
const getLocationCaption = (location) => {
  return `${location.city}, ${location.state}`;
};

const companyLib = {
  getLocationCaption,
};

export default companyLib;
