// import sanitize from "../src/sanitize";
const sanitize = require('../src/sanitize').sanitize

//font http://shakespeare.mit.edu/hamlet/full.html
//some quote was add for testing reasons
const text = `Good Hamlet, cast thy nighted colour off,
And let thine eye look like a friend on Denmark.
Do not for ever with thy vailed "lids
Seek for thy noble father in the" dust:
Thou know'st 'tis common; \"all\" that lives must die,
Passing through nature to eternity.`

const sanitizedText = `Good Hamlet, cast thy nighted colour off,
And let thine eye look like a friend on Denmark.
Do not for ever with thy vailed lids
Seek for thy noble father in the dust:
Thou know'st 'tis common; all that lives must die,
Passing through nature to eternity.`

const sanitizedTextEscaped = `Good Hamlet, cast thy nighted colour off,
And let thine eye look like a friend on Denmark.
Do not for ever with thy vailed \\"lids
Seek for thy noble father in the\\" dust:
Thou know'st 'tis common; \\"all\\" that lives must die,
Passing through nature to eternity.`

test('Default sanitize', () => {
  expect(sanitize('Hello "Victor Lacerda" World')).toBe(
    'Hello Victor Lacerda World',
  )
  expect(sanitize('Hello "Victor\nLacerda" World')).toBe(
    'Hello Victor\nLacerda World',
  )

  expect(sanitize(text)).toBe(sanitizedText)
})

test('Escape sanitize', () => {
  const conf = {
    escape: true,
  }
  expect(sanitize('Hello "Victor Lacerda" World', conf)).toBe(
    'Hello \\"Victor Lacerda\\" World',
  )
  expect(sanitize('Hello "Victor\nLacerda" World', conf)).toBe(
    'Hello \\"Victor\nLacerda\\" World',
  )

  expect(sanitize(text, conf)).toBe(sanitizedTextEscaped)
})

test('Html sanitize', () => {
  const sanitizedTextHtml = `Good Hamlet, cast thy nighted colour off,
And let thine eye look like a friend on Denmark.
Do not for ever with thy vailed <q>lids
Seek for thy noble father in the</q> dust:
Thou know'st 'tis common; <q>all</q> that lives must die,
Passing through nature to eternity.`

  const conf = {
    useHtmlTag: true,
  }
  expect(sanitize('Hello "Victor Lacerda" World', conf)).toBe(
    'Hello <q>Victor Lacerda</q> World',
  )
  expect(sanitize('Hello "Victor\nLacerda" World', conf)).toBe(
    'Hello <q>Victor\nLacerda</q> World',
  )

  expect(
    sanitize(text, {
      useHtmlTag: true,
    }),
  ).toBe(sanitizedTextHtml)
})

test('Order operation sanitize', () => {
  const conf = {
    escape: true,
    useHtmlTag: true,
  }
  expect(sanitize('Hello "Victor Lacerda" World', conf)).toBe(
    'Hello \\"Victor Lacerda\\" World',
  )
  expect(sanitize('Hello "Victor\nLacerda" World', conf)).toBe(
    'Hello \\"Victor\nLacerda\\" World',
  )

  expect(sanitize(text, conf)).toBe(sanitizedTextEscaped)
})

test('Smart quote sanitize', () => {
  const textSmartQuote = `Good Hamlet, cast thy nighted colour off,
And let thine eye look like a friend on Denmark.
Do not for ever with thy vailed “lids
Seek for thy noble father in the” dust:
Thou know'st 'tis common; “all” that lives must die,
Passing through nature to eternity.`

  const conf = {
    smartQuote: true,
  }

  expect(sanitize('Hello “Victor Lacerda” World', conf)).toBe(
    'Hello Victor Lacerda World',
  )
  expect(sanitize('Hello “Victor\nLacerda” World', conf)).toBe(
    'Hello Victor\nLacerda World',
  )
  expect(sanitize(textSmartQuote, conf)).toBe(sanitizedText)
})

test('Single quote sanitize', () => {
  const singleQuoteSanitized = `Good Hamlet, cast thy nighted colour off,
And let thine eye look like a friend on Denmark.
Do not for ever with thy vailed "lids
Seek for thy noble father in the" dust:
Thou knowst tis common; "all" that lives must die,
Passing through nature to eternity.`

  const conf = {
    quote: "'",
  }

  expect(sanitize("Hello 'Victor Lacerda' World", conf)).toBe(
    'Hello Victor Lacerda World',
  )
  expect(sanitize("Hello 'Victor\nLacerda' World", conf)).toBe(
    'Hello Victor\nLacerda World',
  )

  expect(sanitize(text, conf)).toBe(singleQuoteSanitized)
})

test('No args test', () => {
  expect(() => {
    sanitize()
  }).toThrow(TypeError)
})
