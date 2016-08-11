module.exports = {
  "env": {
    "browser": false,
    "commonjs": true,
    "es6": true,
    "jasmine" : true,
    "node"    : true,
    "shared-node-browser" : false,
    "mocha" : true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [],
  "rules": {
    "no-console"     : 0,
    "linebreak-style": [
        "error",
        "unix"
    ],
    "semi": [
        "error",
        "always"
    ]
  },
  "globals" : {
    "console" : true
  }
};
