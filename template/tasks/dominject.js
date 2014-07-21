var _ = require('lodash');
var path = require('path');

module.exports = function(grunt) {

  var jsDir = path.join('js');

  grunt.registerTask('di:index', 'Generates an index of all known RequireJS modules.', function () {
    processScriptsIndex();
  });


  //--------------------------------------------------------------------------
  //
  // Helpers
  //
  //--------------------------------------------------------------------------


  var processTemplate = function (template, filepath, context) {
    context = _.extend({}, grunt.config(), context);
    template = grunt.file.read(template);
    template = grunt.template.process(template, { data: context });
    grunt.file.write(filepath, template);
  };

  var processScriptsIndex = function (rel, command, isClient, prefix) {
    prefix = prefix || '';
    var filepatterns = [
      path.join(jsDir, '**/*.js'),
      '!**/main.js', '!**/app-controller.js', '!**/index.js'
    ]
    grunt.verbose.writeflags(filepatterns, 'filepatterns')

    var context = {};
    var files = grunt.file.expand({ filter: 'isFile' }, filepatterns);
    grunt.verbose.writeflags(files, 'files');

    context.modules = files.map(function (name) {
      name = path.relative(jsDir, name);
      name = path.join(path.dirname(name), path.basename(name, '.js'));
      return name;
    });

    grunt.verbose.writeflags(context, 'context');

    processTemplate(
      'tasks/templates/scripts-index.js',
      path.join(jsDir, 'index.js'),
      context
    );
  };

}