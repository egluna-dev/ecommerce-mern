const express = require("express");

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
});

// app.get('/api/products', (req, res) => {
//     res.send('API is running...')
// });

PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`));