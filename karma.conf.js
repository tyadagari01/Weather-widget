//jshint strict: false
module.exports = function (config) {
    config.set({
        basePath: ''
        , files: [
      'app/bower_components/angular/angular.js'
      , 'app/bower_components/angular-animate/angular-animate.js'
      , 'app/bower_components/angular-resource/angular-resource.js'
      , 'app/bower_components/angular-route/angular-route.js'
      , 'app/bower_components/angular-mocks/angular-mocks.js'
      , 'app/**/*.module.js'
      , 'app/*!(.module|.spec).js'
      , 'app/!(bower_components)/**/*!(.module|.spec).js'
      , 'app/**/*.spec.js'
    ]
        , autoWatch: true
        , frameworks: ['jasmine']
        , browsers: ['Chrome']
        , preprocessors: {
            '**/*.html': ['ng-html2js']
            , '**/*.js': ['coverage']
        }
        , ngHtml2JsPreprocessor: {
            stripPrefix: 'app/'
            , moduleName: 'karma.templates'
        }
        , reporters: ['progress', 'coverage']
        , coverageReporter: {
            type: 'html'
            , dir: 'coverage/'
        }
        , port: 8080
        , colors: true, // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000
        , browserDisconnectTimeout: 10000, // default 2000
        browserDisconnectTolerance: 1, // default 0
        browserNoActivityTimeout: 100000, //default 10000
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false, // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 10000, // yeah everything is slow, keep the ink
        plugins: [
              'karma-chrome-launcher'
            , 'karma-jasmine'
            , 'karma-coverage'
            , 'karma-ng-html2js-preprocessor'
            , 'karma-env-preprocessor'
            , 'karma-requirejs'
        ]
    });
};