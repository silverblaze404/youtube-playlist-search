import * as React from 'react';
import Main from './Container Components/Main';
import YoutubeVideoList from './Presentational Components/YoutubeListing';

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from 'react-router-dom';

const isTokenAvailable = () => {
  let access_token;
  try {
    access_token = new URL(window.location.href).hash.split('&').filter(function(el) { return (el.match('access_token') !== null ? true : false) })[0].split('=')[1];
    console.log(access_token);
    if(access_token!==undefined || access_token!==undefined){
    return true;
    } else {
      return false;
    }
  }
  catch(err) {
    return false;
  }
}

function App() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("")
  const [videos, setVideos] = React.useState([]);
  const [resultVideos, setResultVideos] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState(isTokenAvailable());
  console.log(isAuthenticated);

  function handleStartDateChange(date) {
      setStartDate(date);
  }

  function handleEndDateChange(date) {
      setEndDate(date);
  }

  return(
    <div>
    <button onClick={() => oauthSignIn()}>Authenticate via google</button>
    <Main setIsAuthenticated={setIsAuthenticated} videos={videos} setResultVideos={setResultVideos} setVideos={setVideos} startDate={startDate} endDate={endDate} handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange}></Main>
    <YoutubeVideoList isAuthenticated={isAuthenticated} videos={resultVideos} startDate={startDate} endDate={endDate}></YoutubeVideoList>
    </div>
  )
}

export default App;



function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);


  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '1077111754875-ttpcs2pht3eql29og1i0m4k081ut03p8.apps.googleusercontent.com',
                'redirect_uri': window.location.href,
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/youtube.readonly',
                'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
};
