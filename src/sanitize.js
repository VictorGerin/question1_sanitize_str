

/**
 * 
 * Remove all Qoutations in the str
 * 
 * @param {string} str - text to be saniteze
 * @param {Object} conf - Configuration object
 * @param {string} conf.qoute ['"'] - Qoute to be search in text
 * @param {boolean} conf.escape [false] - Escape all conf.qoute with \
 * @param {boolean} conf.useHtmlTag [false] - Replaces the qoutes to Html qoute <p>
 * @returns Sanitized string
 */
function sanitize(str, conf)
{
    
    conf = {
        ...{
            qoute : '"',
            escape: false,
            useHtmlTag: false
        },...conf
    }

    //Remove all qoute that has words between like in:
    // Hello "Victor Lacerda" World
    let reQoute = new RegExp(`[${conf.qoute}](.*?)[${conf.qoute}]`);

    //Same as before but taking into account new line like in:
    // Hello "Victor
    // Lacerda" World
    let reQouteNewLine = new RegExp(`[${conf.qoute}]([^]*?)[${conf.qoute}]`, 'm');

    var replaceFirst = '';
    var replaceLast = '';
    if (conf.escape) {
        replaceFirst = '\\' + conf.qoute;
        replaceLast = '\\' + conf.qoute;
    } else if(conf.useHtmlTag) {
        replaceFirst = '<q>'
        replaceLast = '</q>'
    }

    str = str.replace(reQoute, `${replaceFirst}$1${replaceLast}`)
    str = str.replace(reQouteNewLine, `${replaceFirst}$1${replaceLast}`)

    return str
}

export default sanitize
