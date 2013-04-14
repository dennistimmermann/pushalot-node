# pushalot-node #

## About #
pushalot-node is a very small NodeJS module for the Pushalot REST API (http://pushalot.com) to push notifications (toasts) to Windows 8 and Windows Phone with a straight forward API.

## Requirements #
To send notifications to a device you need to obtain the corresponding authorization token. To test the service and send notifications to your own device you can use your default "api" token (https://pushalot.com/manager/authorizations) or create a custom app (https://pushalot.com/manager/apps).

## Usage #
```javascript
var Pushalot = require('pushalot-node')

var client = new Pushalot( "aBcDEfAuthorizationToken" )

client.push('I am a test notification')
.on('success', function ( code , res ) {
  //
})
.on('error', function (code , res ) {
  //
})
```

### new Pushalot(token) #
The Pushalot method requires an authorization token and returns a client object

```javascript
var client = new Pushalot(authorizationToken)
```

### client.push(...) #
In order to send notifications to the user, simply call `push` on the client.
The `push` method exposes different signatures

#### client.push(message, [title], [args]) #

```javascript
/**
 * @param {String} message    message that will be sent
 * @param {String} [title]    notification title
 * @param {Object} [args]     prepared object with additional information
 */
client.push(message, title, args)

// examples
client.push('just testing')
client.push('another test', 'Headline')
client.push('something happened', 'Important', {IsImportant: true})
```

#### client.push(args) ##

```javascript
/**
 * @param {Object} args         prepared object with all information
 */
client.push(args)

// example
client.push({ Body: 'text'
            , Title: 'Title'
            , Link: 'http://www.reddit.com/r/pushalot/'
            })
```

Please see the Pushalot API (http://pushalot.com/api) docs for information on the available keys/values for the `args` object

### Events #
`push` returns an `EventEmitter` so you can easily listen to the result

```javascript
var toast = client.push('my cat can eat a whole watermelon')
```

#### toast.on('success', cb) #
```javascript
/**
 * @param   {Number}  code      HTTP statusCode
 * @param   {String}  res       body of response (may contain additional information)
 */
toast.on('success', function ( code, res ) {
    //...
})
```

`code` will always be `200` on success
#### toast.on('error', cb) #
```javascript
/**
 * @param   {Number}  code      HTTP statusCode
 * @param   {String}  res       body of response (may contain additional information)
 */
toast.on('error', function ( code, res ) {
    //...
})
```

If something went wrong, you can lookup the `code` at the Pushalot API (http://pushalot.com/api#basics) to debug your application. The response body (`res`) may also contain helpful information.

### Pushalot.source #
In case you want to display a custom application-wide source name instead of the registered name of your app, just assign a string to `Pushalot.source`

```javascript
 var Pushalot = require('pushalot-node')

 Pushalot.source = 'my application'
 ``` 
