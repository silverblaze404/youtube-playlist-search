import DateInput from '../Presentational Components/DateInput';
import * as React from 'react';

export default function Main(props) {

    const {setIsAuthenticated, startDate, endDate, handleEndDateChange, handleStartDateChange, setVideos, videos, setResultVideos} = props

    const [inputValue, setInputValue] = React.useState("");

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    
    

    return (
        <div>
            <h1>Select a date range:</h1>
            <p style={{display: 'inline'}}>Start Date: </p><DateInput Date={startDate} onChange={handleStartDateChange} />
            <p style={{display: 'inline'}}>End Date: </p><DateInput Date={endDate} onChange={handleEndDateChange} />
            <div>
                <label htmlFor="input">Playlist id: </label>
                <input style={{display: 'block'}} type="text" id="input" value={inputValue} onChange={handleChange} />
            </div>
            <button style={{display: 'block', marginTop: '25px'}} onClick={async () => {
                var access_token = '';
                try {
                    access_token = new URL(window.location.href).hash.split('&').filter(function(el) { return (el.match('access_token') !== null ? true: false) })[0].split('=')[1];
                    if(videos.length===0){
                        let response1 = await fetch(
                            createUrl(inputValue, ""),  {
                                method: "GET",
                                headers: {
                                    "Content-type": "application/json;charset=UTF-8",
                                    "Authorization": "Bearer " + access_token,
                                }
                            }
                        );
                        let data = await response1.json();
                        console.log(data);
                        let finalVideos = [].concat(data.items);
                        let pageToken = data.nextPageToken;
                        while (pageToken!==undefined) {
                            response1 = await fetch(
                                createUrl(inputValue, pageToken), {
                                    method: "GET",
                                    headers: {
                                        "Content-type": "application/json;charset=UTF-8",
                                        "Authorization": "Bearer " + access_token,
                                    }
                                }
                            );
                            data = await response1.json();
                            finalVideos = finalVideos.concat(data.items);
                            pageToken = data.nextPageToken;
                        };
                        setVideos(finalVideos);
                        setResultVideos(filterVideos(startDate, endDate, finalVideos));
                        setIsAuthenticated(true);
                    } else {
                        console.log(videos.length);
                        setResultVideos(filterVideos(startDate, endDate, videos));
                        setIsAuthenticated(true);
                    }
                }
                catch (err) {
                    console.log(err);
                    setIsAuthenticated(false);
                }
            }}>Get videos</button>
        </div>
    );
};


// import * as React from 'react';

// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// export default function BasicDateRangePicker() {
//   const [value, setValue] = React.useState([null, null]);

//   return (
//     <LocalizationProvider
//       dateAdapter={AdapterDayjs}
//       localeText={{ start: 'Check-in', end: 'Check-out' }}
//     >
//       <DateRangePicker
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(startProps, endProps) => (
//           <React.Fragment>
//             <TextField {...startProps} />
//             <Box sx={{ mx: 2 }}> to </Box>
//             <TextField {...endProps} />
//           </React.Fragment>
//         )}
//       />
//     </LocalizationProvider>
//   );
// }



const createUrl = (playlisturl, token) => {
    playlisturl = new URL(playlisturl);
    let qparams = new URLSearchParams(playlisturl.search);
    let playlistId = qparams.get('list');
    const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
    const params = {
        part: "snippet,contentDetails",
        maxResults: 50,
        playlistId: playlistId,
        pageToken: token,
        // videoId: "CTu8q28wIQM"
    };

    const queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

    // Append query string to URL
    const apiUrl = `${url}?${queryString}`;

    return apiUrl

}

const filterVideos = (startDate, endDate, videos) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if(!(startDate instanceof Date && !isNaN(startDate.valueOf()))){
        let finalVideos1 = [];
        for(var i=0; i<videos.length; i++){
            if(videos[i].contentDetails.videoPublishedAt!==undefined){
                finalVideos1.push(videos[i]);
            }
        }
        return finalVideos1.reverse(); 
    }
    if(!(endDate instanceof Date && !isNaN(endDate.valueOf()))){
        let finalVideos1 = [];
        for(var j=0; j<videos.length; j++){
            if(videos[j].contentDetails.videoPublishedAt!==undefined){
                finalVideos1.push(videos[j]);
            }
        }
        return finalVideos1.reverse();
    }
    let finalVideos1 = [];
    for(var k=0; k<videos.length; k++){
        if(videos[k].contentDetails.videoPublishedAt!==undefined){
            let videoDate = new Date(videos[k].contentDetails.videoPublishedAt.substring(0, 10));
            if(videoDate.getTime() >= startDate.getTime() && videoDate.getTime() <= endDate.getTime()){
                finalVideos1.push(videos[k]);
            }
        }
    }
    return finalVideos1.reverse();
};
