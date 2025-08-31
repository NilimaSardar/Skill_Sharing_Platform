const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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

module.exports = mongoose.model("User", UserSchema);
