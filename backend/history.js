// const express = require('express');
// const router = express.Router();
// const db = require('./db');

// // Fetching history data
// router.get('/history', (req, res) => {
//   const query = 'SELECT username, feature_used, DATE_FORMAT(action_date, "%Y-%m-%d") AS action_date, action_time FROM user_history';
  
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching data:', err);
//       res.status(500).send('Error fetching data. Please try again later.');
//       return;
//     }
//     res.json(results);
//   });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const db = require('./db');

// Utility function to convert db.query to a Promise
function queryPromise(query, params = []) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

// Fetching history data with Promises
router.get('/history', async (req, res) => {
  const query = 'SELECT username, feature_used, DATE_FORMAT(action_date, "%Y-%m-%d") AS action_date, action_time FROM user_history';

  try {
    const results = await queryPromise(query);
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data. Please try again later.');
  }
});

module.exports = router;
