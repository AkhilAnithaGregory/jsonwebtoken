const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

// Secret key for signing JWT
const secretKey = "yourSecretKey";

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Sample user data (for demonstration purposes only)
const users = [
  { id: 1, UserName: "user1", Password: "Password1" },
  { id: 2, UserName: "user2", Password: "Password2" },
];

// Middleware to generate a JWT token upon successful login
const generateToken = (user) => {
  return jwt.sign({ id: user.id, UserName: user.UserName }, secretKey, {
    expiresIn: "1h",
  });
};

// User login endpoint
app.post("/login", express.json(), (req, res) => {
  const { UserName, Password } = req.body;
  // Find the user based on the provided UserName and Password (for demonstration purposes only)
  const user = users.find(
    (u) => u.UserName === UserName && u.Password === Password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid UserName or Password" });
  }

  // Generate a JWT token upon successful login
  const token = generateToken(user);
  console.log(token);
  res.json({ token });
});

// Protected endpoint with authorization middleware
app.get("/protected", authorize, (req, res) => {
  // Access the decoded user information from req.user
  console.log("Authenticated User:", req.user);

  // Your protected route logic here
  res.send({
    // ... your data
  });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Authorization middleware
function authorize(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  if (!token) {
    return res
      .status(401)
      .json({ error: "Invalid or missing authentication token" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded payload to the request object for further use
    req.user = decoded;

    // If authorized, continue to the next middleware or route
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
