export default defineOAuthGoogleEventHandler({
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
    return sendRedirect(event, '/')
  },
})