const math = require('mathjs')

module.exports =
class Calculator {

  static isExpression (input) {
    return math.eval(input)
  }
}
