const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const UserSchema = new Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  },
  emailConfirmed: {
      type: Boolean,
      
  },
  email:  {
      type: String,
      required: true,
      unique: true
  },
  password:  {
      type: String,
      required: true
  }
});



module.exports = {
  UserSchema,
 

}