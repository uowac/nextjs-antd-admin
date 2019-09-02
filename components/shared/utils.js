export const validateLatitude = (rule, value, callback) => {
  if (!value || !value.trim()) return callback()
  if (isNaN(value)) {
    return callback('Please fill in a valid latitude value!')
  } else {
    if (parseFloat(value) <= -90 || parseFloat(value) >= 90) {
      return callback('Please fill in a valid latitude value!')
    }
  }
  return callback()
}

export const validateLongitude = (rule, value, callback) => {
  if (!value || !value.trim()) return callback()
  if (isNaN(value)) {
    return callback('Please fill in a valid longitude value!')
  } else {
    if (parseFloat(value) <= -180 || parseFloat(value) >= 180) {
      return callback('Please fill in a valid longitude value!')
    }
  }
  return callback()
}
