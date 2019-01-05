/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

//------------------------------------------
    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
      .post('/api/books')
      .send({'title': "test"})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'title', 'Books in array should contain title');
        assert.equal(res.body.title,"test")
        assert.isString(res.body.title,"title should be a string");
        assert.property(res.body, '_id', 'Books in array should contain _id');
        done();
      });
      });
      
      test('Test POST /api/books with no title given', function(done) {
         chai.request(server)
      .post('/api/books')
      .send({'title': ""}) 
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.notProperty(res.body,"title");
        assert.equal(res.text,'missing title')
        done();
      });
      })
      
    });
  //------------------------------------  
    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });     
      })
    });
 
//--------------------------------------
    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
      .get('/api/books/1c30d5156f335a5b4925680f')
      .end(function(err, res){
          assert.equal(res.status,200);
          assert.equal(res.text,'no book exists') 
          done();
      })    
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
      .get('/api/books/5c30d5156f335a5b4925680e')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body, 'title', 'Books in array should contain title');
        assert.property(res.body, '_id', 'Books in array should contain _id');  
        assert.equal(res.body._id,'5c30d5156f335a5b4925680e') 
        done();
      })    
      }) 
      
    });

//-------------------------------

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
      .post('/api/books/5c30d5156f335a5b4925680e')
      .query({comment:'book1'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.property(res.body, 'title', 'Books in array should contain title');
        assert.equal(res.body.title,"War and Piece");
        assert.property(res.body,"comment");
        assert.equal(res.body.comment[0],'book 1');
        assert.property(res.body, "commentcount");
        assert.equal(res.body.commentcount,res.body.comment.length);  
        assert.property(res.body, '_id', 'Books in array should contain _id');
        done();
      });
      });
      })
    });

});