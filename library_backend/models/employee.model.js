const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    employeeId: 
    { 
      type: String, 
      required: [true, "Please enter employee Id"], 
      unique: true 
    },

    fullName: 
    { 
      type: String, 
      required: [true, "Please enter employee name"]
    },
    
    password: { 
      type: String, 
      required: true 
    },

    role: { 
      type: String, 
      required: true 
    },

    address: { 
      type: String 
    },

    phoneNumber: { 
      type: String 
    },
  }
);

const Employee = mongoose.model("nhanVien", employeeSchema);
module.exports = Employee;
