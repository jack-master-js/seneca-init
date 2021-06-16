module.exports = {
  success: () => {
    return {
      success: true
    }
  },
  data: (data,total) => {
    return {
      success: true,
      data,
      total
    }
  },
  error: (error) => {
    console.error(error)
    return {
      success: false,
      message:error.message
    }
  },
  message: (message) => {
    console.error(message)
    return {
      success: false,
      message
    }
  }
}
