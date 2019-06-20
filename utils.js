const formatResult = (rs) => {
  if (rs.status === 200) {
    return rs.data
  } else {
    return rs;
  }
}

const formatError = (rs) => {
  if (rs.status === 200) {
    return rs.data
  } else {
    return rs;
  }
}

module.exports = { formatResult, formatError }