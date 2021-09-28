
import sanitize from './sanitize'


var text = "Good Hamlet, cast thy nighted colour off,\n" +
"And let thine eye look like a friend on Denmark.\n" +
"Do not for ever with thy vailed \"lids\n" +
"Seek for thy noble father in the\" dust:\n" +
"Thou know'st 'tis common; \"all\" that lives must die,\n" +
"Passing through nature to eternity.\n"


console.log(sanitize(text, {
    escape: true
}))

// export default sanitize