export default defineOAuthGoogleEventHandler({
  // config: {
  //   scope: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/youtube'],
  //   authorizationParams: {
  //     access_type: 'offline',
  //   }
  // },
  async onSuccess(event, { user, tokens }) {

    // Optionally : find if the user with this email already exists in your database
    // if not, create the user
    // .....

    await setUserSession(event, {
      user: {
        login: user.name,
        email: user.email,
        loggedInAt: new Date().toISOString(),
      },
    })
    return sendRedirect(event, '/')
  },
  onError(event, error) {
    return sendRedirect(event, '/login')
  },
})