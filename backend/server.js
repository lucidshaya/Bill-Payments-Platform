import app from './app.js'; // Adjusted path (no src)
import sequelize from './config/database.js'; // Adjusted path (no src)

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
});