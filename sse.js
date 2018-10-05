// function to call to send data to the front end
// once the front end recieves 
module.exports = function (req, res, next) {
    res.sseSetup = function() {
	console.log('got inside the sseSetup')
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })
	console.log('setup succcesful')
    }

    res.sseSend = function(data) {
	console.log('got inside the sseSend')
        res.write("event: workOutEvent\n")
        res.write("data: " + JSON.stringify(data) + "\n\n");
	console.log('send succesful')
    }
	console.log('no problems up until 17')
    next()
};
