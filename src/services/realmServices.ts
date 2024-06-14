import { app } from '../constants';

async function createUser(userData: object) {
  try {
    const user = app.currentUser;
     if (user === null) return;
    console.log("user......",user);
    const mongodb = user.mongoClient('mongodb-atlas');
    const usersCollection = mongodb.db('user-account').collection('Contacts');
    const doctorCollection = mongodb.db('user-account').collection('Doctors');

    const doctor = await doctorCollection.findOne();
    const doctors = doctor._id.toString();
    console.log('doctor', doctors);

    userData = {
      ...userData,
      doctor: doctors,
    };

    console.log('doctorCollection created successfully:', doctor);
    await usersCollection.insertOne(userData);
    console.log('User created successfully:', userData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function searchUser(searchQuery: string) {
  try {
    const user = app.currentUser;
    if (user === null) return null;
    console.log('Search..........', user);

    const mongodb = user.mongoClient('mongodb-atlas');
    const usersCollection = mongodb.db('user-account').collection('Contacts');
    const pattern = searchQuery;
    try {
      const result = await usersCollection.find({
        name: { $regex: pattern, $options: 'i' },
      });

      console.log('search result', result);
      // console.log(result[0]._id.toString());
      return result;
    } catch (error) {
      console.error('Error while performing regex search:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error while performing lookup function:', error);
    throw error;
  }
}
async function searchDoctors(id: string) {
  try {
    const user = app.currentUser;
    if (user === null) return null;
    console.log('Search..........', user);
    const mongodb = user.mongoClient('mongodb-atlas');
    const usersCollection = mongodb.db('user-account').collection('Doctors');
    const pattern = id;
    try {
      const result = await usersCollection.find({ loginKey: pattern });

      console.log('search result', result);
      // console.log(result[0]._id.toString());
      return result;
    } catch (error) {
      console.error('Error while performing regex search:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error while performing lookup function:', error);
    throw error;
  }
}

export { createUser, searchUser, searchDoctors };
