var https = require('https')
  , EventEmitter = require('events').EventEmitter

var send = function( payload , toast) {
  var req = https.request(
    { hostname: 'pushalot.com'
    , port: 443
    , path: '/api/sendmessage'
    , method: 'POST'
    , headers:
      { 'User-Agent': 'pushalot-node/0.0.1 (nodejs)'
      , 'Content-Type': 'application/json'
      , 'Content-Length': payload.length
      }
    },
    function ( res ) {
      res.setEncoding('utf8');
      res.on('data', function(d) {
        if(res.statusCode == 200) toast.emit('success', 200, d)
        else toast.emit('error', res.statusCode, d)
      })
    }
  )
  req.write(payload);
  req.end();

  req.on('error', function(e) {
    toast.emit('error', req.statusCode, e)
  })
}

var app = function ( token ) {
    this.token = token
}

app.prototype.push = function ( body , title , data ) {
  //.push(args)
  if( typeof body == 'object') {
    data = body
  }
  //.push(body,[title],[args])
  else {
    data = data || {}
    data.Body = data.Body || body
    data.Title || title && (data.Title = title)
  }
  data.AuthorizationToken = this.token
  data.Source || app.source && (data.Source =  app.source)

  var toast = new EventEmitter()

  send(JSON.stringify(data), toast)
  return toast
}

app.source = undefined
app.version = '0.0.1'

module.exports = app
