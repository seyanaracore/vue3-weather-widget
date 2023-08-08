const tsConfig = require('../../tsconfig.json')

const PUBLIC_PATH = 'web'

/**
 * Пути из tsconfig без /*
 * @type {[string, string][]}
 */
const tsConfigAliases = Object.entries(tsConfig.compilerOptions.paths).map(
  ([pathName, pathValue]) => [pathName.slice(0, -2), pathValue[0].slice(0, -2)]
)

module.exports = {
  tsConfigAliases,
  PUBLIC_PATH,
}
