# Mongoose rename _id plugin

Can change "_id" to "id" for all queries besides `Model.create()`.


```js
var renameIdPlugin = require('mongoose-rename-id');

schema.plugin(renameIdPlugin({newIdName: 'id'}));

Post.create({ _id: id });

Post.find({ id });
Post.update({ id }, {some: true});
Post.findOneAndUpdate({ id }, {some: true});
Post.remove({ id });
```