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
        res.write("event: workOutEvent\ndata: " + data + "\n\n");
    }
    res.newEvent = function(data) {
        res.write("event: newEvent\ndata: " + data + "\n\n");
    }
    next();
};