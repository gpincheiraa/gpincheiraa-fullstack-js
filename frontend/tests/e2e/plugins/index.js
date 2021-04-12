const path = require('path')

module.exports = (on, config) => {
  const fixturesFolder = path.join(path.resolve('.'), '../fixtures')

  return Object.assign({}, config, {
    fixturesFolder,
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js'
  })
}
