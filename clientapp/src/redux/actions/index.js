export const LOGIN_USER = 'LOGIN_USER'

export const LoginUser = (isLoggedIn) => ({
    type: LOGIN_USER,
    payload: isLoggedIn,
  })