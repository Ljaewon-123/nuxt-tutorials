export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers
  });

  if(session) { 
    // access the session.session && session.user
    console.log(session.session);
    console.log(session.user);
  }

  return session
});