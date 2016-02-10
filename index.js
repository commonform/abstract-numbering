module.exports = numbering

var array = Array.isArray.bind(Array)
var object = require('isobject')
var integer = require('is-integer')

function nonZeroPositiveInteger(argument) {
  return ( integer(argument) && argument >= 1 ) }

// A position is ...
function position(argument) {
  return (
    // ... an object ...
    object(argument) &&

    // ... with a "number" property ...
    argument.hasOwnProperty('number') &&
    // ... that is a non-zero positive integer ...
    nonZeroPositiveInteger(argument.number) &&

    // ... and an "of" property ...
    argument.hasOwnProperty('of') &&
    // ... that is also a non-zero positive integer ...
    nonZeroPositiveInteger(argument.of) ) }

// A component is ...
function component(argument) {
  return (
    // ... an object ...
    object(argument) &&

    // ... with a "series" property ...
    argument.hasOwnProperty('series') &&
    // ... that is a position ...
    position(argument.series) &&

    // ... and an "element" property ...
    argument.hasOwnProperty('element') &&
    // ... that is also a position ...
    position(argument.element) ) }

// A numbering is ...
function numbering(argument) {
  return (
    // ... an array ...
    array(argument) &&
    // ... of elements ...
    argument.length > 0 &&
    // ... each of which is a component.
    argument.every(component) ) }
