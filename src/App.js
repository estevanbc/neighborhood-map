import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Map from './map/Map'
import * as FoursquareAPI from './apis/FoursquareAPI'

import SidebarWrapper from './sidebar/SidebarWrapper'

class NeighborhoodMapApp extends React.Component {

  state = {
    query: '',
    places: [],
    selectedPlace: null,
    location: {
      lat: -25.4071667,
      lng: -49.2508695
    }
  }

  componentDidMount() {
    this.loadPlaces();
  }

  loadPlaces() {
    Promise.all([
      FoursquareAPI.explore(this.state.location)
    ]).then(([foursquarePlaces]) => {
      this.setState({ places: foursquarePlaces.places })
    })
  }

  onPlaceMouseOver(place) {
    this.setState({
      selectedPlace: place
    });
  }

  onPlaceMouseOut() {
    this.setState({
      selectedPlace: null
    });
  }

  render() {
    const { location, query, places, selectedPlace } = this.state;

    return (
      <div className="App">
        <SidebarWrapper query={query} places={places} selectedPlace={selectedPlace}
          onPlaceMouseOver={(place) => this.onPlaceMouseOver(place)}
          onPlaceMouseOut={(place) => this.onPlaceMouseOut(place)} >
          <Map center={location} 
            places={places}
            selectedPlace={selectedPlace}
            onPlaceMouseOver={(place) => this.onPlaceMouseOver(place)}
            onPlaceMouseOut={(place) => this.onPlaceMouseOut(place)} />
        </SidebarWrapper>
      </div>
    )
  }

}

export default NeighborhoodMapApp;
