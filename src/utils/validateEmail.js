export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /* eslint-disable-next-line */
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) ? false : 'Valid email required'
}
