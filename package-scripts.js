const npsUtils = require('nps-utils')

const { rimraf, concurrent, series } = npsUtils

module.exports = {
  scripts: {
    build: 'node ./scripts/build',
    clean: series(rimraf('build'), rimraf('coverage')),
    commit: 'git cz',
    default: 'node ./scripts/start',
    reportCoverage: 'codecov',
    test: {
      default:
        'node ./scripts/test --bail --env=jsdom --runInBand --updateSnapshot',
      config: series.nps('test --showConfig'),
      coverage: series.nps('test --coverage --silent')
    },
    validate: {
      withCoverage: concurrent.nps('test.coverage')
    }
  }
}
