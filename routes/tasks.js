const express = require('express');
const router  = express.Router();
const mongojs = require('mongojs');
const db      = mongojs('mongodb://triyan:INMED2017@ds031972.mlab.com:31972/insanmedika_beta', ['tasks']);


// mendapatkan semua task
router.get('/tasks', (req, res, next) => {
  db.tasks.find((err, tasks) => {
    if(err) {
      console.log(err);
    }
    res.json(tasks);
  });
});

// mendapatkan task by id
router.get('/task/:id', (req, res, next) => {
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
    if(err) {
      console.log(err);
    }
    res.json(task);
  });
});


// tambah task atau simpan task baru
router.post('/task', (req, res, next) => {
  let task = req.body;
  if(!task.title || (task.isDone + '')) {
    res.status(400);
    res.json({
      "error" : "bad data cuy"
    });
  } else {
    db.tasks.save(task, (err, task) => {
      if(err) {
        console.log(err);
      }
      res.json(task);
    });
  }
});


// delete task
router.delete('/task/:id', (req, res, next) => {
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
    if(err) {
      console.log(err);
    }
    res.json(task);
  });
});


// update task
router.put('/task/:id', (req, res, next) => {
  let task = req.body;
  let updTask = {};

  if(task.isDone) {
    updTask.isDone = task.isDone;
  }

  if(task.title) {
    updTask.title = task.title;
  }

  if(!updTask) {
    res.status(400);
    res.json({
      "error" : "bad data cuy"
    });
  } else {
      db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, (err, task) => {
        if(err) {
          console.log(err);
        }
        res.json(task);
      });
  }
});



module.exports  = router;
