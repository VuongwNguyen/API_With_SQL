const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const AccessTokenLife = process.env.ACCESS_TOKEN_LIFE || 86400; // 24 hours
const RefreshTokenLife = process.env.REFRESH_TOKEN_LIFE || 86400 * 30; // 30 days
const RefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret'
const saltRounds = 10;

class AuthService {
    // accessToken service
    async generateAccessToken(account) {
        return jwt.sign({ id: account.id }, JWT_SECRET, {
            expiresIn: AccessTokenLife
        });
    }
    async verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (e) {
            return null;
        }
    }


    // refreshToken service
    async generateRefreshToken(account) {
        return jwt.sign({ id: account.id }, RefreshTokenSecret, {
            expiresIn: RefreshTokenLife
        });
    }
    async verifyRefreshToken(token) {
        try {
            return jwt.verify(token, RefreshTokenSecret);
        } catch (e) {
            return null;
        }
    }
}

module.exports = new AuthService();

