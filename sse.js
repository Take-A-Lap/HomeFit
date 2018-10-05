// function to call to send data to the front end
// once the front end recieves 
module.exports = function (req, res, next) {
    res.sseSetup = function() {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no'
        })
    }

    res.sseSend = function(data) {
        res.write("event: workOutEvent\n")
        res.write("data: " + JSON.stringify(data) + "\n\n");
    }

    res.sseChange = function(data) {
        res.write("event: page-change\n")
        res.write("data: " + JSON.stringify(data) + "\n\n");
    }

    next()
};