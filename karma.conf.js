//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'bower/angular/angular.js',
      'bower/angular-mocks/angular-mocks.js',
      'js/image-game*/**/*.js',
      'js/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
