/*
 *
 *  DO NOT MODIFY THIS FILE
 *
 *
 * This is a generated file.
 * If you want to get an updated version of this file, run:
 *
 * `grunt di:index`
 *
 * admin@matthewkirk.co.uk
 *
 */
define(function (require, exports, module) {
  'use strict';

  var _ = require('underscore');<% _.each(modules, function (module) { %>
  require('<%= module %>');<% }) %>

  var index = [<% _.each(modules, function (module) { %>
    '<%= module %>',<% }) %>
  ];

  exports.contains = function (name) {
    return _.contains(index, name);
  }

  return exports;
});