const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');



//Bringing in the models
const Post = require('../Models/posts');




//Multer Components
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  //Reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype  === 'image/jpg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});





//GET request
//ROUTE: /post/getPosts
router.get('/getPost/:bookname', async (req, res) => {
	const variable = req.params.bookname;
	
    let checkPost = await Post.find({ bookname:variable });
    if(checkPost)
    {
    	res.send(checkPost);	
    }else{
    	res.send('No data found');
    }
});


//New request to create post
router.post('/createPost',upload.single('image'), async(req,res) => {
	let formfield = {};
	if(req.body.bookname)
		formfield.bookname = req.body.bookname;
	if(req.body.description)
		formfield.description = req.body.description;
	if(req.body.image)
		formfield.image = req.body.image;
  var str = 'http://localhost:3002/';
  if(req.file) formfield.image = str + req.file.path.replace(/\\/g,"/");

const data = await new Post(formfield).save();

if(data){
res.send(data);
}
else{
	res.send('Error');
}
});

//Request to update post
router.post('/editPost', async(req,res) => {
  let editFields = {};
  if(req.body.bookname)
   editFields.bookname = req.body.bookname;
  if(req.body.description)
   editFields.description = req.body.description;
  if(req.body.image)
   editFields.image = req.body.image;

  Post.findOneAndUpdate({ _id: req.body.postid }, { $set: editFields})
          .then(updatedPost => res.send(updatedPost))
          .catch(err => res.json(err));
  
});

//Request to delete post
router.delete('/deletePost/:postid', (req,res) => {
  id = req.params.postid;
  Post.findOneAndRemove({_id: id})
  .then(deletedPost => res.send(deletedPost))
  .catch(err => res.json(err));
});





module.exports = router;