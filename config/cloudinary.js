const cloudinary = require("cloudinary").v2;
cloudinary.config({
  Cloud_Name: "doa5p4v4z",
  API_Key: "713324216691184",
  API_Secret: "UiCKSCwd-jKb_Bt8TvDbXnKf4Q8",
  secure: true,
});

module.exports = { cloudinary };
