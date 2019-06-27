import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import {
  Image
} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const PlaceMarker = ({ place, selectedPlace, mouseOver, mouseOut }) => {

  const onMouseOver = () => {
    if (mouseOver) mouseOver(place);
  }

  const onMouseOut = () => {
    if (mouseOut) mouseOut(place);
  }

  return (
    <div className={`marker ${selectedPlace && selectedPlace.id === place.id ? 'marker-active' : ''}`}
      onMouseOut={() => onMouseOut()} onMouseOver={() => onMouseOver()}>
      <Image src={`${place.categories[0].icon.prefix}44${place.categories[0].icon.suffix}`} circular />
    </div>
  );
}

class Map extends Component {
  static propTypes = {
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number,
    places: PropTypes.array.isRequired,
    selectedPlace: PropTypes.object,
    onPlaceMouseOver: PropTypes.func,
    onPlaceMouseOut: PropTypes.func
  }

  static defaultProps = {
    zoom: 16
  };

  state = {
    map: null
  }

  componentDidMount() {

  }

  onLoad() {
    const bounds = new window.google.maps.LatLngBounds();
    for (let place of this.state.places) {
      bounds.extend(place.location);      
    }
    this.state.map.fitBounds(bounds);
  }

  onGoogleApiLoaded(maps) {
    console.log(maps);
  }

  createMapOptions() {
    return {
      styles: [
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    }
  }

  render() {
    console.log('render');
    const { places, selectedPlace, onPlaceMouseOver, onPlaceMouseOut } = this.props

    let placesOrderedBySelected;
    if (selectedPlace) {
      placesOrderedBySelected = places.filter(place => place.id !== selectedPlace.id)
      placesOrderedBySelected.push(selectedPlace);
    } else {
      placesOrderedBySelected = places;
    }

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={this.createMapOptions}
          onGoogleApiLoaded={(maps) => this.onGoogleApiLoaded(maps)}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {
            placesOrderedBySelected.length && placesOrderedBySelected
              .map((place) => (
                <PlaceMarker key={place.name}
                  lat={place.location.lat}
                  lng={place.location.lng}
                  place={place}
                  selectedPlace={selectedPlace}
                  mouseOver={(place) => onPlaceMouseOver ? onPlaceMouseOver(place) : null}
                  mouseOut={(place) => onPlaceMouseOut ? onPlaceMouseOut(place) : null}                  
                />
              ))
          }
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map