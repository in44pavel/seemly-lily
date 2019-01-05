/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});


module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
   
    MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {console.log('Database error: ' + err);
      } else {console.log('Successful database connection');}
      
    var collection = db.collection("books");
        collection.find(/*searchQuery*/{}).toArray(function(err,docs){res.json(docs)});
     })
    //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
   
    .post(function (req, res){
    
      var title = req.body.title;
      var comment=req.body.comment=[];
      var output={"title":title, 'commentcount':comment.length,'comment':comment}
    //response will contain new book object including atleast _id and title
    if(!title ) {
        res.send('missing title');
      } else {
        
    MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {console.log('Database error: ' + err);
      } else {console.log('Successful database connection');}
      
      
      var collection = db.collection('books');
          collection.insertOne(output,function(err,doc){
            output._id = doc.insertedId;
            
            res.json(output); 
          });
     });
    }
    })
    
   .delete(function(req, res){
    
    
    MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {console.log('Database error: ' + err);
      } else {console.log('Successful database connection');}
      
      var collection = db.collection("books");
        collection.remove({},function(err,docs){
          
          if(err) return console.log(err); 
          res.send('deleted successful')
        })
    })
  });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;

     if (bookid){ bookid = new ObjectId(bookid)}
   
    MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {console.log('Database error: ' + err);
      } else {console.log('Successful database connection');}
      
    var collection = db.collection("books");
        collection.find(bookid).toArray(function(err,docs){
          //output._id = docs.insertedId;
          if(err) return console.log(err);
          docs[0]==null? res.send("no book exists"):
          res.json(docs[0])});
         })
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
    
    MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {console.log('Database error: ' + err);
      } else {console.log('Successful database connection');}
      
    var collection = db.collection("books");
        collection.findAndModify(
          {_id:new ObjectId(bookid)},[['_id',1]],{$inc:{commentcount:1},$push:{comment:comment}},{new: true},
          function(err,docs){
          if(err) return console.log(err);
          res.json(docs.value)
          });
    })
    //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      bookid = new ObjectId(bookid);
    
    MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {console.log('Database error: ' + err);
      } else {console.log('Successful database connection');}
      
      var collection = db.collection("books");
        collection.findOneAndDelete({_id: bookid},function(err,docs){
          
          if(err) return console.log(err); 
          res.send('deleted successful')
        })
    
    
    })
    });
  
};