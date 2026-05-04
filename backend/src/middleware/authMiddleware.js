import jwt from "jsonwebtoken";

// 🔐 Authentication Middleware
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      ...decoded,
      role: decoded.role.toLowerCase() // Ensure role is lowercase
    };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// 🛡️ Role-Based Access Control
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};

// 👑 Admin Check Middleware
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin access required" });
  }
  next();
};

