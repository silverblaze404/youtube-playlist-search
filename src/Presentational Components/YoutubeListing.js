import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';

// function YoutubeApi(url, params) {

//     return null;
// };



export default function YoutubeVideoList(props) {

    const {videos, isAuthenticated} = props;

    // Build query string from params object
    

    // Call API using fetch()
    // React.useEffect(() => {
    //     fetch(apiUrl)
    //     .then(response => response.json())
    //     .then((data) => {

    //         setVideos(data.items);
    //         console.log(data)
    //     })
    //     .catch(error => console.error(error));
    // }, [apiUrl, setIsButtonClicked]);

    console.log(videos);

    const [searchTerm, setSearchTerm] = React.useState('');
  
    const filteredList = videos.filter(item =>
      item.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <SearchableList filteredList={filteredList} searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchableList>
            <MyComponent isAuthenticated={isAuthenticated} list={filteredList}></MyComponent>
        </div>
    )
};

// const useStyles = makeStyles((theme) => ({
//     root: {
//       width: '100%',
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper,
//     },
//   }));
  
  function MyComponent(props) {
    // const classes = useStyles();

    const {list, isAuthenticated} = props;
  
    return (
      <div>
        {!isAuthenticated && <p>Please Authenticate First</p>}
        {list.length!==0 && <h1>List of videos {list.length}</h1>}
        <List component="nav" aria-label="main mailbox folders">
          {props.list.map((item,index) => {
              let dates = new Date(item.contentDetails.videoPublishedAt);
              return (
            <ListItem key={index}>
              <img alt="yt-thumbnail" style={{maxWidth: '250px', maxHeight: '200px'}} src={item.snippet.thumbnails.high.url}></img>
              <a rel="noreferrer" target="_blank" href={'https://www.youtube.com/watch?v=' + item.contentDetails.videoId}>{item.snippet.title}</a>
              <p>{dates.toString()}</p>
            </ListItem>
          )})}
        </List>
      </div>
    );
  }




  function SearchableList(prop) {
    const {searchTerm, setSearchTerm} = prop;
    
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    );
  };
  