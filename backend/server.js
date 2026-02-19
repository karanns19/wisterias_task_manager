require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);

            const RENDER_URL = process.env.RENDER_URL;
            if (RENDER_URL) {
                const interval = 30000;
                setInterval(() => {
                    const https = require('https');
                    https.get(RENDER_URL, (res) => {
                        console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${res.statusCode}`);
                    }).on('error', (err) => {
                        console.error(`Error reloading at ${new Date().toISOString()}:`, err.message);
                    });
                }, interval);
            }
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


