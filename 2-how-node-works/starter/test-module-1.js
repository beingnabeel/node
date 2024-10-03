// class calculator {
//   add(a, b) {
//     return a + b;
//   }
//   multiply(a, b) {
//     return a * b;
//   }
//   divide(a, b) {
//     return a / b;
//   }
// }

// module.exports = calculator;
// So module.exports is exactly what is returned from one module, so whatever we put there, well, then gets exported automatically, right? We can then save the exported value to a variable when importing it, so let's do that now. And now here we can actually give it any name that we want. So the name that we are exporting on the other side, so in this other module, doesn't matter. We can call it anything we want here. So in that sense it's just like a normal function return, right, so we can always return any variable, but then call it something else when we basically save the result of a function to a variable, right?

// -------------------------ANOTHER WAY OF EXPORTING MODULES----------------

module.exports = class {
  add(a, b) {
    return a + b;
  }
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    return a / b;
  }
};
