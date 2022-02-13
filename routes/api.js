"use strict";

const ThreadModel = require("../models/models").Thread;
const ReplyModel = require("../models/models").Reply;

module.exports = function (app) {

  //POST request to /api/threads/{board}
  app.post('/api/threads/:board', (req, res) => {
    let newThread = new ThreadModel(req.body)
    if(!newThread.board || newThread.board === '') {
      newThread.board = req.params.board
    }
    newThread.created_on = new Date()//.toUTCString()
    newThread.bumped_on = new Date()//.toUTCString()

    newThread.save((err, savedThread) => {
      if(!err && savedThread) {
        return res.redirect('/b/' + savedThread.board + '/' + savedThread._id)
      }
    })
  })
  
  app.post('/api/replies/:board', (request, response) => {

    let newReply = new ReplyModel({
      text: request.body.text,
      delete_password: request.body.delete_password
    })
    newReply.created_on = new Date().toUTCString()
    newReply.reported = false
  
    ThreadModel.findByIdAndUpdate(
      request.body.thread_id,
      {$push: {replies: newReply}, bumped_on : new Date().toUTCString()},
      {new: true},
      (error, updatedThread) => {
        if(!error && updatedThread){
          response.redirect('/b/' + updatedThread.board + '/' + updatedThread.id + '?new_reply_id=' + newReply.id)
        }
      }
    )
  
  })
/*
  app.route("/api/threads/:board")
    .post((req, res) => {})
  
    .get((req, res) => {})

    .put((req, res) => {})

    .delete((req, res) => {});

  app.route("/api/replies/:board")
    .post((req, res) => {})

    .get((req, res) => {})

    .put((req, res) => {})

    .delete((req, res) => {});

*/
};
