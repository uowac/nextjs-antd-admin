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

export const convertNonAccent = str => {
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
  str = str.replace(/\u02C6|\u0306|\u031B/g, '')
  return str
}
