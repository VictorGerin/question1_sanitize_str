import sanitize from "../src/sanitize";

//font http://shakespeare.mit.edu/hamlet/full.html
//some qoute was add for testing reasons
var text =
  "Good Hamlet, cast thy nighted colour off,\n" +
  "And let thine eye look like a friend on Denmark.\n" +
  'Do not for ever with thy vailed "lids\n' +
  'Seek for thy noble father in the" dust:\n' +
  "Thou know'st 'tis common; \"all\" that lives must die,\n" +
  "Passing through nature to eternity.\n";

var sanitizedText =
  "Good Hamlet, cast thy nighted colour off,\n" +
  "And let thine eye look like a friend on Denmark.\n" +
  "Do not for ever with thy vailed lids\n" +
  "Seek for thy noble father in the dust:\n" +
  "Thou know'st 'tis common; all that lives must die,\n" +
  "Passing through nature to eternity.\n";

var sanitizedTextEscaped =
  "Good Hamlet, cast thy nighted colour off,\n" +
  "And let thine eye look like a friend on Denmark.\n" +
  'Do not for ever with thy vailed \\"lids\n' +
  'Seek for thy noble father in the\\" dust:\n' +
  "Thou know'st 'tis common; \\\"all\\\" that lives must die,\n" +
  "Passing through nature to eternity.\n";

var sanitizedTextHtml =
  "Good Hamlet, cast thy nighted colour off,\n" +
  "And let thine eye look like a friend on Denmark.\n" +
  "Do not for ever with thy vailed <q>lids\n" +
  "Seek for thy noble father in the</q> dust:\n" +
  "Thou know'st 'tis common; <q>all</q> that lives must die,\n" +
  "Passing through nature to eternity.\n";

test("Default sanitize", () => {
  expect(sanitize('Hello "Victor Lacerda" World')).toBe(
    "Hello Victor Lacerda World"
  );
  expect(sanitize('Hello "Victor\nLacerda" World')).toBe(
    "Hello Victor\nLacerda World"
  );

  expect(sanitize(text)).toBe(sanitizedText);
});

test("Escape sanitize", () => {
  var conf = {
    escape: true,
  };
  expect(sanitize('Hello "Victor Lacerda" World', conf)).toBe(
    'Hello \\\\"Victor Lacerda\\\\" World'
  );
  expect(sanitize('Hello "Victor\nLacerda" World', conf)).toBe(
    'Hello \\"Victor\nLacerda\\" World'
  );

  expect(sanitize(text, conf)).toBe(sanitizedTextEscaped);
});

test("Html sanitize", () => {
  var conf = {
    useHtmlTag: true,
  };
  expect(sanitize('Hello "Victor Lacerda" World', conf)).toBe(
    "Hello <q>Victor Lacerda</q> World"
  );
  expect(sanitize('Hello "Victor\nLacerda" World', conf)).toBe(
    "Hello <q>Victor\nLacerda</q> World"
  );

  expect(
    sanitize(text, {
      useHtmlTag: true,
    })
  ).toBe(sanitizedTextHtml);
});

test("Order operation sanitize", () => {
  var conf = {
    escape: true,
    useHtmlTag: true,
  };
  expect(sanitize('Hello "Victor Lacerda" World', conf)).toBe(
    'Hello \\\\"Victor Lacerda\\\\" World'
  );
  expect(sanitize('Hello "Victor\nLacerda" World', conf)).toBe(
    'Hello \\"Victor\nLacerda\\" World'
  );

  expect(sanitize(text, conf)).toBe(sanitizedTextEscaped);
});
