/**
 *
 * Remove all Qoutations in the str
 *
 * @param {string} str - text to be saniteze
 * @param {Object} conf - Configuration object
 * @param {string} conf.quote ['"'] - quote to be search in text
 * @param {boolean} conf.smartQuote [false] - When usedm quote is ignored to search with “ ”
 * @param {boolean} conf.escape [false] - Escape all conf.quote with \
 * @param {boolean} conf.useHtmlTag [false] - Replaces the quotes to Html quote <p>
 * @returns Sanitized string
 */
function sanitize(str, conf = {}) {
  if (typeof str !== 'string')
    throw new TypeError('str should be pass to be sanitize')

  if (typeof conf !== 'object') throw new TypeError('conf should be a object')

  const _conf = {
    quote: '"',
    smartQuote: false,
    escape: false,
    useHtmlTag: false,
    ...conf,
  }

  //Remove all quote that has words between like in:
  // Hello "Victor
  // Lacerda" World
  let reQuoteNewLine = new RegExp(
    `[${_conf.smartQuote ? '“' : _conf.quote}]([^]*?)[${
      _conf.smartQuote ? '”' : _conf.quote
    }]`,
    'mg',
  )

  let replaceFirst = ''
  let replaceLast = ''
  if (_conf.escape) {
    replaceFirst = '\\' + _conf.quote
    replaceLast = '\\' + _conf.quote
  } else if (_conf.useHtmlTag) {
    replaceFirst = '<q>'
    replaceLast = '</q>'
  }

  str = str.replace(reQuoteNewLine, `${replaceFirst}$1${replaceLast}`)

  return str
}

exports.sanitize = sanitize
