/**
 * react-beautiful-dnd requires IDs to be string form. For obvious reasons
 * the IDs cannot overlap so a string prefix is applied.
 *
 * @param {string} type
 * @param {number} id
 * @returns {string}
 */
export const getId = (type, id) => {
  if (typeof type === 'number') {
    throw new Error('Type must be string.')
  }

  return `${type}-${id}`
}

/**
 * Convert stringified ID back to a number.
 *
 * @param {string} stringId
 * @returns {number}
 */
export const getIdAsNumber = (stringId) => {
  return Number(stringId.replace(/[a-z]+-/g, ''))
}
