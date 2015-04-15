abstract-numbering.js
=====================

[![NPM version](https://img.shields.io/npm/v/abstract-numbering.svg)](https://www.npmjs.com/package/abstract-numbering)
[![build status](https://img.shields.io/travis/commonform/abstract-numbering.js.svg)](http://travis-ci.org/commonform/abstract-numbering.js)

Validate abstract numberings of hierarchical document parts.

Abstract numberings express how hierarchical document parts like outline sections, headings, or list items should be numbered, without rendering those numberings in any particular way. Other modules in the [`*-numbering` family](https://www.npmjs.com/search?q=-numbering) convert abstract numberings to strings in particular styles, like `"1.2"` or `"1(a)(v)"`.

Each abstract numbering is an array of numbering components, describing first the top-most "parent" of the relevant document part and continuing down to the document part to be numbered itself.

Here is an example of a numbering for the first of two elements at the very top level of a document:

```javascript
var validNumbering = require('abstract-numbering');

var firstExample = [
  {
    series:  {number: 1, of: 1}, // More on series later.
    element: {number: 1, of: 2} // "Element number 1 of 2"
  }
];

validNumbering(firstExample); // === true
```

Note that positions begin with one, not zero:

```javascript
var firstBadExample = [
  {
    series:  {number: 1, of: 1},
    element: {number: 0, of: 1} // 0, not 1
  }
];

validNumbering(firstBadExample); // === false
```

Series are used to describe situations when numbering restarts in the middle of a document part. Consider the following structure:

```none
Heading 1. First Major Heading

  1. Apples
  2. Oranges
  3. Grapes

  1. Lions
  2. Tigers
  3. Bears

Heading 2. Second Major Heading
```

The abstract numbering for the "Tigers" list item would be:

```javascript
var tigers = [
  // The component for "First Major Heading"
  {
    // Numbering of headings does not restart, so there is one series.
    series:  {number: 1, of: 1},
    element: {number: 1, of: 2}
  },
  // The component for "Tigers"
  {
    // There are two series here, the first for fruit and animals.
    // "Tigers" is in the second series.
    series:  {number: 2, of: 2},
    // There are three total elements, of which "Tigers" is second.
    element: {number: 2, of: 3}
  }
];

validNumbering(tigers); // === true
```
