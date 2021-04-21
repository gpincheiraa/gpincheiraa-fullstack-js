const admin = require('firebase-admin')

admin.initializeApp({ credential: admin.credential.applicationDefault() })

module.exports = async (request, response, next) => {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.status(401).json({ message: 'No token provided' })
  }

  const [authorizationType, tokenValue] = headerToken.split(' ')

  if (headerToken && authorizationType.toLowerCase() !== 'bearer') {
    return response.status(401).json({ message: 'Invalid token' })
  }

  try {
    await admin.auth().verifyIdToken(tokenValue)
    next()

  } catch (error) {
    console.error(error.message)

    response
      .status(403)
      .json({ message: 'Could not authorize' })
  }
}
