var express = require('express');
var http = require('http');
var router = express.Router();

const urL_validacao_token = "https://oauth-redirect.googleusercontent.com/r/YOUR_PROJECT_ID?code=AUTHORIZATION_CODE&state=STATE_STRING&scope=REQUESTED_SCOPES&response_type=code&user_locale=LOCALE"

// router.get('/', function (req, res, next) {
//     var dados = getParams(req);

//     var url = urL_validacao_token
//         .replace("YOUR_PROJECT_ID", "")
//         .replace("AUTHORIZATION_CODE", "")
//         .replace("STATE_STRING", "")
//         .replace("REQUESTED_SCOPES", "")
//         .replace("LOCALE", "");

//     res.send({
//         "token_type": "Bearer",
//         "access_token": "asdaSD",
//         "refresh_token": "asdASDasd",
//         "expires_in": 600
//     });
// });

router.get('/', function (req, res, next) {
    res.send(`<html>
    <body>
    <form action="/login" method="post">
    <input type="hidden" name="response_url" value="${req.query.response_url}" />
    <button type="submit" style="font-size:14pt">Link this service to Google</button>
    </form>
    </body>
    </html>
    `);
});

function validateToken(dados) {
    var options = {
        host: 'https://oauth-redirect.googleusercontent.com',
        path: '/r/YOUR_PROJECT_ID'
    };

    var callback = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
        });
    }

    http.request(options, callback).end();
}

function getParams(req) {
    return {
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri,
        state: req.query.state,
        scope: req.query.scope,
        response_type: req.query.response_type,
        user_locale: req.query.user_locale
    };
}

module.exports = router;