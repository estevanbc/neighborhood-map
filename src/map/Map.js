import React, { Component } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types'

class Map extends Component {

  static propTypes = {
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number,
    places: PropTypes.array.isRequired,
    selectPlace: PropTypes.func.isRequired,
    selectedPlace: PropTypes.object
  }

  static defaultProps = {
    zoom: 16
  };

  state = {
    map: null
  }

  componentDidMount() {

  }

  onLoad(map) {
    this.setState({
      map: map
    })
  }

  fitBounds() {
    const { map } = this.state;
    if (map) {
      if (this.props.places.length) {
        const bounds = new window.google.maps.LatLngBounds();
        for (let place of this.props.places) {
          bounds.extend(place.location);
        }
        map.fitBounds(bounds);
        map.panToBounds(bounds);
      } else {
        map.setCenter(this.state.center)
      }
    }
  }

  makeMarkerIcon(color) {
    var markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ color +
      '|40|_|%E2%80%A2',
      new window.google.maps.Size(21, 34),
      new window.google.maps.Point(0, 0),
      new window.google.maps.Point(10, 34),
      new window.google.maps.Size(21,34));
    return markerImage;
  }

  render() {
    const { places, selectedPlace, selectPlace } = this.props

    let placesOrderedBySelected;
    if (selectedPlace) {
      placesOrderedBySelected = places.filter(place => place.id !== selectedPlace.id)
      placesOrderedBySelected.push(selectedPlace);
    } else {
      placesOrderedBySelected = places;
    }

    this.fitBounds();

    return (
      <div className="Map-Container">
        <GoogleMap
          zoom={this.props.zoom}
          center={this.props.center}
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          onLoad={map => this.onLoad(map)}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            styles: [
              {
                "featureType": "poi",
                "stylers": [{ "visibility": "off" }]
              }
            ]
          }}
        >
          {
            places.length && places
              .map((place) => (
                <Marker key={place.id} className="custom-marker"
                  title={place.name}
                  position={place.location}
                  /* icon={`${place.categories[0].icon.prefix}bg_32${place.categories[0].icon.suffix}`} */
                  icon={this.makeMarkerIcon(selectedPlace && place.id === selectedPlace.id ? 'FFFF24' : '0091ff')}
                  animation={selectedPlace && place.id === selectedPlace.id ? window.google.maps.Animation.BOUNCE : null}
                  onClick={() => selectPlace(place)}
                  zIndex={selectedPlace && place.id === selectedPlace.id ? 100 : null}
                />
              ))
          }
          />
        </GoogleMap>
      </div >
    )
  }
}

export default Map