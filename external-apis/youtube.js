const axios = require('axios');
const { YOUTUBE_API_KEY } = require('config.js');
module.exports = (workoutUrl, callback) => {
    axios.get('https://www.googleapis.com/youtube/v3/playlists', {
        params: {
            part: 'snippet',
            id: PLKrfb-haFwJgKpDLFintPMyBHUrJW99tx,
            maxResults: 50,
            key: YOUTUBE_API_KEY
        }
    })
    .then(function ({data}) {
        // call the callback on the resulting list of videos from the playlist
    })
    .catch(function({data}){
        data.error.errors.forEach(function(err) {
            console.error(err.message);
        })
    })
};
