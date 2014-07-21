require.config({

  paths: {
    'jquery': 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'backbone.marionette': 'bower_components/marionette/lib/backbone.marionette',
    'handlebars': 'bower_components/handlebars/handlebars'
  },

  shim: {
    'backbone.marionette': {
      deps: [
        'backbone'
      ],
      exports: 'Marionette'
    },
    "templates": {
      exports: "template"
    }
  }

});