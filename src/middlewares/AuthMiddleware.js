const bcrypt = require('bcrypt');

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