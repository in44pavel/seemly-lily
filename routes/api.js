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

/*MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');  
    }
})*/
module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
    
    var searchQuery = req.query;
      if (searchQuery._id) { searchQuery._id = new ObjectId(searchQuery._id)}
   
    MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {
        console.log('Database error: ' + err);
      } else {
        console.log('Successful database connection');  
      }
    var collection = db.collection("books");
        collection.find(searchQuery).toArray(function(err,docs){res.json(docs)});
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
          
      if(err) {
        console.log('Database error: ' + err);
      } else {
        console.log('Successful database connection');  
      }
     //console.log(res);
      
      var collection = db.collection('books');
          collection.insertOne(output,function(err,doc){
            output._id = doc.insertedId;
            res.json(output);
          });
     });
    }
    })
    
     .delete(/*'/api/books/:delete',*/function(req, res){
      //if successful response will be 'complete delete successful'
    
   /* var searchQuery = req.query;
      if (searchQuery._id) { searchQuery._id = new ObjectId(searchQuery._id)}
   
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');  
    }
    var collection = db.collection("books");
        collection.find(searchQuery).remove(function(err,docs){res.send('complete delete successful')});
     */
     
    
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      
      //var searchQuery = req.query;
      if (bookid) { bookid = new ObjectId(bookid)}
   
    MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          
      if(err) {
        console.log('Database error: ' + err);
      } else {
        console.log('Successful database connection');  
      }
    var collection = db.collection("books");
        collection.find(bookid).toArray(function(err,docs){res.json(docs)});
     })
    
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};