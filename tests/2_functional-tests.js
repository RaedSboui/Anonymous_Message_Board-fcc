const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

let testThread_id;
let testReply_id;
let testPass =  'testPass'
suite("Functional Tests", function () {
  suite("10 functional tests", function () {
    test("Creating a new thread: POST request to /api/threads/{board}", function (done) {
      chai
        .request(server)
        .post("/api/threads/test")
        .set("content-type", "application/json")
        .send({ board: 'test', text: "test text", delete_password: testPass })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          let createdThreadId = res.redirects[0].split('/')[res.redirects[0].split('/').length - 1]
          testThread_id = createdThreadId;
          done();
        });
    });

    test('Post a reply on a Thread', (done) => {
      chai.request(server)
      .post('/api/replies/test')
      .send({
        thread_id: testThread_id,
        text: 'Test Reply from Functional Test',
        delete_password: testPass
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        let createdReplyId =  res.redirects[0].split('=')[res.redirects[0].split('=').length - 1]
        testReply_id = createdReplyId
        done()
      })
    })
  /*  
    test("Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}", function (done) {
      chai
        .request(server)
        .get("/api/threads/test-board")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.exists(res.body[0], "There is a thread");
          assert.equal(res.body[0].text, "test text");
          done();
        });
    });

    test("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", function (done) {
      chai
        .request(server)
        .delete("/api/threads/test-board")
        .set("content-type", "application/json")
        .send({ thread_id: testThread_id, delete_password: "incorrect" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "Incorrect Password");
          done();
        });
    });

    test("Reporting a thread: PUT request to /api/threads/{board}", function (done) {
      console.log("testThread_id", testThread_id);
      chai
        .request(server)
        .put("/api/threads/test-board")
        .set("content-type", "application/json")
        .send({ report_id: testThread_id })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "Success");
          done();
        });
    });

    test("Creating a new reply: POST request to /api/replies/{board}", function (done) {
      chai
        .request(server)
        .post("/api/replies/test-board")
        .set("content-type", "application/json")
        .send({
          thread_id: testThread_id,
          text: "test reply",
          delete_password: "testreply",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.threads[0].replies[0].text, "test reply");
          testReply_id = res.body.threads[0].replies[0]._id;
          done();
        });
    });

    test("Viewing a single thread with all replies: GET request to /api/replies/{board}", function (done) {
      chai
        .request(server)
        .get("/api/replies/test-board")
        .set("content-type", "application/json")
        .query({
          thread_id: testThread_id,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          console.log("test get whole thread body", res.body);
          assert.equal(res.body._id, testThread_id);
          assert.equal(res.body.text, "test text");
          assert.equal(res.body.replies[0].text, "test reply");
          done();
        });
    });

    test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", function (done) {
      console.log(
        "delete reply invalid ids: thread_id: " +
          testThread_id +
          " reply_id: " +
          testReply_id
      );
      chai
        .request(server)
        .delete("/api/replies/test-board")
        .set("content-type", "application/json")
        .send({
          thread_id: testThread_id,
          reply_id: testReply_id,
          delete_password: "Incorrect",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "Incorrect Password");
          done();
        });
    });

    test("Reporting a reply: PUT request to /api/replies/{board}", function (done) {
      chai
        .request(server)
        .put("/api/replies/test-board")
        .set("content-type", "application/json")
        .send({
          thread_id: testThread_id,
          reply_id: testReply_id,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "Success");
          done();
        });
    });

    test("Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password", function (done) {
      chai
        .request(server)
        .delete("/api/replies/test-board")
        .set("content-type", "application/json")
        .send({
          thread_id: testThread_id,
          reply_id: testReply_id,
          delete_password: "testreply",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "Success");
          done();
        });
    });

    test("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", function (done) {
      chai
        .request(server)
        .delete("/api/threads/test-board")
        .set("content-type", "application/json")
        .send({ thread_id: testThread_id, delete_password: "test" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "Success");
          done();
        });
    });
    */
  });
});
