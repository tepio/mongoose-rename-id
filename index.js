var _ = require('lodash');
var hookPlugin = require('mongoose-hook');

module.exports = function (opt) {
  var newIdName = opt.newIdName;
  var mongoose = opt.mongoose;
  var transformId = function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  };

  return function (schema) {
    _.set(schema, 'options.toObject.transform', transformId);
    _.set(schema, 'options.toJSON.transform', transformId);

    schema.plugin(hookPlugin, {
      mongoose: mongoose,
      pre: function (doc, done) {
        if (_.has(doc, 'query.insert')) return done();
        if (!_.has(doc, 'query.' + newIdName)) return done();

        doc.query._id = doc.query[newIdName];
        delete doc.query[newIdName];
        done();
      }
    });
  }
};
