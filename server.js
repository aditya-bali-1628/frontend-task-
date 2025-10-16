const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_notes_db');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
