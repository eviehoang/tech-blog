const User = require('./User');
const Comments = require('./Comments');
const Blog = require('./Blog');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

Blog.hasMany(Comments,{
  foreignKey: 'blog_id'
})

Comments.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Blog, Comments };