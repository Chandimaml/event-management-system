const multer = require('multer');
const path = require('path');

// පින්තූරය Save වෙන තැන සහ නම තීරණය කිරීම
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // කලින්ම uploads කියලා folder එකක් හදලා තියෙන්න ඕනේ
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`); // නම පටලැවෙන්නැති වෙන්න Timestamp එකක් දානවා
  }
});

// File එක Image එකක්ද කියලා Check කිරීම
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!');
};

const upload = multer({ storage, fileFilter });

module.exports = upload;