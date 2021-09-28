

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
function sanitize(str, conf)
{

    if(str === undefined)
        throw new TypeError('str should be pass to be sanitize')

    conf = {
        ...{
            quote : '"',
            smartQuote: false,
            escape: false,
            useHtmlTag: false
        },...conf
    }
    
    //Remove all quote that has words between like in:
    // Hello "Victor Lacerda" World
    let reQuote = new RegExp(`[${conf.smartQuote ? '“' : conf.quote}](.*?)[${conf.smartQuote ? '”' : conf.quote}]`);

    //Same as before but taking into account new line like in:
    // Hello "Victor
    // Lacerda" World
    let reQuoteNewLine = new RegExp(`[${conf.smartQuote ? '“' : conf.quote}]([^]*?)[${conf.smartQuote ? '”' : conf.quote}]`, 'm');

    var replaceFirst = '';
    var replaceLast = '';
    if (conf.escape) {
        replaceFirst = '\\' + conf.quote;
        replaceLast = '\\' + conf.quote;
    } else if(conf.useHtmlTag) {
        replaceFirst = '<q>'
        replaceLast = '</q>'
    }

    str = str.replace(reQuote, `${replaceFirst}$1${replaceLast}`)
    str = str.replace(reQuoteNewLine, `${replaceFirst}$1${replaceLast}`)

    return str
}

export default sanitize
