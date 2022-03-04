const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const express = require('express');
// const { animals } = require('./data/animals');

// fs to write file
// path is built into nodes api used to provide utilities for working with file and directory paths
// const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// makes certain files readily available and doesn't gate it behind server endpoint
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});