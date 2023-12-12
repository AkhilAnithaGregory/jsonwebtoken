const express = require('express');
const cors = require('cors');
const authAPI = require('./routes/authAPI');  // Adjust the path accordingly
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Use the routes from the imported file
app.use('/user', authAPI);  // Specify the base path for these routes
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
