var express = require( 'express' );
var jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');



var app = express();
var port = 3000;

var verifyJWT = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

app.get( '/',verifyJWT, (req, res) => {
    res.json({ username: 'Flavio' })
});

app.listen( port, () => {
    console.log(`Running in ${port}`)
} ) ;