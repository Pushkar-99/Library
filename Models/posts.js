const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema(
  {
    bookname:{
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    }
  },

  {
    timestamps: true
  }
  );

module.exports = Post = mongoose.model('Post', PostSchema);; 