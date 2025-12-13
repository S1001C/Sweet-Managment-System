
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db"); // importing function

const PORT = process.env.PORT || 5000;

connectDB(); // calling function

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
