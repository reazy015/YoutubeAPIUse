import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyC8U57h8XkDxcgnDOyCByLLq6_-enm3pbs';



class App extends Component{
  constructor(props){
    super(props);

    this.state = {
			videos: [],
			selectedVideo: null
		};
	this.videoSearch('surboards')
}
		videoSearch(term){
			YTSearch({key: API_KEY, term: term}, (videos) => {
				this.setState({
					videos: videos,
					selectedVideo: videos[0]
				 });
			});
		}


  render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
	  <div>
	  	<h1 className='cheader'>Mytube search with React</h1>
	  	<SearchBar onSearchTermChange={videoSearch} />
			<VideoDetails video={this.state.selectedVideo}/>
			<VideoList
				onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} />
	  </div>
	  )
  }
};

ReactDOM.render(<App/>, document.querySelector('.container'));
