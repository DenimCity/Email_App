const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

 const UserSchema = new Schema({
  firstName: {
      type: String,
      
  },
  lastName: {
      type: String,
      
  },
  emailConfirmed: {
      type: Boolean,
      default:false
      
  },
  email:  {
      type: String,
      unique: true
  },
  password:  {
      type: String,
      
  }
},{
  timestamps: {},
  usePushEach: true
})


module.exports = {
  UserSchema,
 

}