const express = require('express');
const cors = require('cors');
const historyRoutes = require('/history');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', historyRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
