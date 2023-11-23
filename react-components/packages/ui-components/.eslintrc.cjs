// Copyright rigélblu inc. All rights reserved.

module.exports = {
  extends: ['@rb/custom/eslint-react-lib'],
  // FIXME: figure out why putting into root or this workspace .eslintrc doesn't work
  ignorePatterns: ['.eslintrc.cjs', 'package.json', 'tsconfig.json'],
};
