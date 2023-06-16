const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

/**
 * @returns { string }
 */
exports.hash = (text) => {
    const hash = bcrypt.hashSync(text, 8);
    return hash;
}

/**
 * @returns { boolean }
 */
exports.compare = (text, hashed) => {
    return bcrypt.compareSync(text, hashed);
}

/**
 * @returns { string }
 */
exports.jwtEncode = (data) => {
    const key = process.env.JWT_KEY || "";
        
    return jwt.sign(data, key, {expiresIn: '1 days'});;
}

/**
 * @params token: string
 * @returns { User: { id: string, role: 'admin' || 'customer' } }
 */
exports.jwtDecode = (token) => {
    const key = process.env.JWT_KEY || "";

    decoded = jwt.verify(token, key);
    return decoded;
}