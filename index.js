const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // Recipe.create({ title: 'Goulash', cuisine: 'persian'}).then(() => {
    //   Recipe.find( {project: {title: 1}} ).then((recipe) => {
    //     console.log('Recipe title is: ' + recipe)
    //   })
    // })

    Recipe.insertMany(data).then(() => {

      // Recipe.find({}, 'title', function(err, docs) { }).then((recipe) => {
      //   console.log(recipe)
      // })
    
      // Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set:{duration: 100}}, {new: true}).then((recipe) => { 
      //   console.log(recipe)
      // })

      Recipe.deleteOne({title: 'Carrot Cake'}).then((recipe) => { 
        console.log('Carrot Cake has been removed.')

        mongoose.connection.close(() => {
          console.log('Mongoose default connection disconnected through app termination');
        });

      })

  })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
