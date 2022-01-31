var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/reg', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO Employee (Employee_id,name,LastName,email,password,retypepassword) VALUES (?,?,?,?,?,?)";
    connection.query(query, [req.body.Employee_id,req.body.name,req.body.LastName,req.body.email,req.body.password,req.body.retypepassword], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

       res.send();

    });
  });

});
router.post('/register.html', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(req.body);
    console.log(req.body.Employee_id);
    var query = "SELECT *  FROM Employee WHERE Employee_id = ?  ";
    connection.query(query, [req.body.Employee_id], function(err, rows, fields) {
     //connection.release();




        res.send();






    });
  });
   res.send();

});
router.post('/registerManager', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO Manager (Manager_id,name,LastName,email,password,retypepassword) VALUES (?,?,?,?,?,?)";
    connection.query(query, [req.body.Manager_id,req.body.name,req.body.LastName,req.body.email,req.body.password,req.body.retypepassword], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

       res.send();

    });
  });

});

router.post('/login.html', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(req.body);
    console.log(req.body.Manager_id);
    var query = "SELECT * FROM Manager WHERE Manager_id =?  ";
    connection.query(query, [req.body.Manager_id], function(err, rows, fields) {
    connection.release();



      if(rows[0].Manager_id == req.body.Manager_id){
        if( rows[0].password == req.body.password  ){
          req.session.user = rows;
           console.log(rows);

          res.send();
           }
        else{
          console.log("Wrong credentials !");
        res.sendStatus(401);

        }


      }
      else{
        console.log("Wrong credentials !");
        res.sendStatus(401);
        }
    });
  });



});



router.get('/task', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT Employee_id,name FROM Employee";
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


    res.json(rows);

    });
  });

});
router.post('/taskadd', function(req, res, next) {
  console.log(req.body);
  //res.send();

  req.pool.getConnection( function(err,connection) {
     if (err) {
       res.sendStatus(500);
       return;
     }
     console.log("in first query");
     var query = "INSERT INTO Task (Task_id,Description,Employee_id ) VALUES (?,?,?) ";
     connection.query(query, [req.body.Task_id, req.body.Description, req.body.Employee_id],function(err, rows, fields) {
       //connection.release(); // release connection
       if (err) {
         console.log(err);
         res.sendStatus(500);
         return;
       }
       console.log("got response from 1 query");

       var query1 = "SELECT * FROM Task WHERE Employee_id =? ";
       connection.query(query1, [req.body.Employee_id], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
           console.log(err);
          res.sendStatus(500);
          return;
        }
        console.log("works");
        res.json(rows);

        });
   });

});
});


router.post('/taskdelete', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "DELETE FROM Task WHERE Task.Task_id=? AND Task.Description=?";
    connection.query(query, [req.body.Task_id,req.body.Description],function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


    res.end();

    });
  });

});
router.post('/starttime', function(req, res, next) {
  console.log(req.body);
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO  startTime(time,Employee_id) VALUES (?,?)";
    connection.query(query, [req.body.time,req.body.Employee_id], function(err, rows, fields) {
      //connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
        console.log(req.body);
      var query1 = "SELECT * FROM startTime WHERE Employee_id =? ";
       connection.query(query1, [req.body.Employee_id], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
           console.log(err);
          res.sendStatus(500);
          return;
        }
        console.log("works");
        res.json(rows);

        });




    });
  });


});
router.post('/endtime', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO endTime(endtime,Employee_id) VALUES (?,?)";
    connection.query(query, [req.body.endtime,req.body.Employee_id], function(err, rows, fields) {
      //connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
       var query1 = "SELECT * FROM endTime WHERE Employee_id =? ";
       connection.query(query1, [req.body.Employee_id], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        console.log("works");
        res.json(rows);

        });



    });
  });

});
// router.post('/endtiming', function(req, res, next) {

//   req.pool.getConnection( function(err,connection) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//     var query = "INSERT INTO Ava(start,endd,Employee_id) VALUES (?,?,?)";
//     connection.query(query, [req.body.start,req.body.endd,req.body.Employee_id], function(err, rows, fields) {
//       //connection.release(); // release connection
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//         return;
//       }
//     var query1 = "SELECT * FROM Ava WHERE Employee_id =? ";
//     connection.query(query1, [req.body.Employee_id], function(err, rows, fields) {
//         connection.release(); // release connection
//         if (err) {
//           console.log(err);
//           res.sendStatus(500);
//           return;
//         }
//         console.log("works");
//         res.json(rows);

//         });



//     });
//   });

// });
router.get('/get', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT Task_id,Description FROM Task WHERE Task.Task_id =Task.Task_id AND Task.Description= Task.Description";
    connection.query(query, [req.body.Task_id,req.body.Description],function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


    res.json(rows);

    });
  });

});
router.get('/taskget', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT Task_id,Description FROM Task WHERE Task.Task_id =Task.Task_id AND Task.Description= Task.Description";
    connection.query(query, [req.body.Task_id,req.body.Description],function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


    res.json(rows);

    });
  });

});
module.exports = router;
