const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_admin: { type: Boolean, default: false },
  last_login: Date,
  profile: {
    first_name: String,
    middle_name: String,
    last_name: String,
    profile_image_url: String,
    cover_image_url: String,
    bio: String,
    phone_number: String,
    address: String,
    city: String,
    state: String,
    country: String,
    date_of_birth: Date,
    gender: String,
    preferred_language: String,
    created_date: { type: Date, default: Date.now },
    updated_date: Date
  },
  skills: [{
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
    name: String,
    type: String,
    proficiency_level: String,
    description: String,
    created_date: Date
  }],
  certificates: [{
    certificate_id: mongoose.Schema.Types.ObjectId,
    verified_by_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    issuing_authority: String,
    issue_date: Date,
    expiry_date: Date,
    credential_url: String,
    credential_id: String,
    credential_type: String,
    status: String,
    verification_notes: String,
    submitted_date: Date,
    verified_date: Date,
    is_primary: Boolean,
    priority_level: Number,
    custom_fields: Object
  }],
  created_date: { type: Date, default: Date.now }
});


//secure the password with the bcrypt
userSchema.pre('save', async function(next){
  // console.log("pre method", this);

  const user = this;
  

  if(!user.isModified("password_hash")){
      next();
  }

  try {
      
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password_hash, saltRound);
      user.password_hash = hash_password;

  } catch (error) {
      next(error);
  }
})

//compare the password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password_hash)
}

//JSON Web Token (JWT)
userSchema.methods.generateToken = async function (){
  try {
      return jwt.sign({
          userId: this._id.toString(),
          email: this.email,
          is_admin: this.is_admin,
      },
      process.env.JWT_SECRET_KEY,
      {
          expiresIn: "30d",
      }
      );
  } catch (error) {
      console.error(error);
      
  }
};

module.exports = mongoose.model("User", userSchema);
