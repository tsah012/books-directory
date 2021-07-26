const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../configuration/app');

module.exports.issueJWT = (user) => {
    const payload = {
        sub: user._id,
        iat: Date.now()
    }

    const privateKey = this.getPrivateKey();
    const signedToken = jwt.sign(payload, privateKey, { expiresIn: config.tokenExpirationTime, algorithm: 'RS256' });

    return {
        token: 'Bearer ' + signedToken,
        expires: config.tokenExpirationTime
    }
}

module.exports.getPublicKey = () => {
    const keyPath = path.join(__dirname, '..', 'configuration/keys/rsa_pub.pem');
    const pubKey = fs.readFileSync(keyPath, 'utf-8');
    return pubKey;
}

module.exports.getPrivateKey = () => {
    const keyPath = path.join(__dirname, '..', 'configuration/keys/rsa_priv.pem');
    const privKey = fs.readFileSync(keyPath, 'utf-8');
    return privKey;
}