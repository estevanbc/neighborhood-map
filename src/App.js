import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { LoadScript } from '@react-google-maps/api'
import './App.css';
import PlaceList from './place-list/PlaceList'
import Map from './map/Map'
import PlaceDetails from './place-details/PlaceDetails'
import * as FoursquareAPI from './apis/FoursquareAPI'
import { Button, Message } from 'semantic-ui-react'

class NeighborhoodMapApp extends React.Component {

  static googleMapsLibraries = ['places'];

  state = {
    list: {
      query: '',
      loading: false,
      places: [],
      error: null,
      noPlacesFound: false,
      visible: true
    },
    detail: {
      loading: false,
      error: null,
      data: null,
      show: false,
    },
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
    this.setState(prevState => {
      return {
        list: Object.assign({}, prevState.list, {
          loading: true
        })
      }
    });

    Promise.all([
      FoursquareAPI.explore(this.state.location, this.state.list.query)
    ]).then(([foursquarePlaces]) => {
      this.setState(prevState => {
        return {
          list: Object.assign({}, prevState.list, {
            places: foursquarePlaces.places,
            loading: false,
            noPlacesFound: foursquarePlaces.total === 0,
            error: null
          })
        }
      });
    }).catch(err => {
      this.setState({ 
        list: {...this.state.list, error: err, loading: false}
      })
    })
  }

  loadPlaceDetail(place) {
    this.setState(prevState => {
      return {
        selectedPlace: place,
        detail: Object.assign({}, prevState.detail, {
          place: null,
          loading: true,
          error: null
        })
      }
    });
    FoursquareAPI.get(place.id)
      .then(place => {
        this.setState(prevState => {
          return {
            detail: Object.assign({}, prevState.detail, {
              place: place,
              loading: false,
              error: null
            })
          }
        });
      })
      .catch(err => {
        this.setState(prevState => {
          return {
            detail: Object.assign({}, prevState.detail, {
              place: null,
              loading: false,
              error: err
            })
          }
        });
      })
  }

  selectPlace(place) {
    this.showHideDetails(true);
    if (!this.state.selectedPlace || this.state.selectedPlace.id !== place.id) {
      this.loadPlaceDetail(place);
    }
  }

  updateQuery(query) {
    this.setState(prevState => {
      return {
        list: Object.assign({}, prevState.list, {
          query: query
        })
      }
    });
    this.loadPlaces();
  }

  showHideDetails(show) {
    this.setState(prevState => {
      return {
        detail: Object.assign({}, prevState.detail, { show })
      }
    });
  }

  toogleMenu() {
    this.setState(prevState => {
      return {
        list: Object.assign({}, prevState.list, {
          visible: !prevState.list.visible
        })
      }
    });
  }

  render() {
    const { location, list, detail, selectedPlace } = this.state;

    return (
      <div className={`App ${list.visible ? 'List-Visible' : ''}`}>
        <LoadScript
          googleMapsApiKey="AIzaSyCiUP_32ebrd-g_3HyM2WhDGfH9Qj46KW4"
          libraries={NeighborhoodMapApp.googleMapsLibraries}
        >
          <div className="Messages">
            {list.error && (
              <Message negative color='red'>
                <Message.Header>We're sorry =(</Message.Header>
                <p>There was a search error</p>
              </Message>
            )}
            {list.noPlacesFound && (
              <Message warning color='yellow'>
                <Message.Header>Try another filter ;)</Message.Header>
                <p>No locations found</p>
              </Message>
            )}
          </div>

          <PlaceList query={list.query} loading={list.loading}
            visible={list.visible} places={list.places}
            selectPlace={(place) => this.selectPlace(place)}
            selectedPlace={selectedPlace}
            updateQuery={(query) => this.updateQuery(query)} />

          <Button className="Menu-Toggle" onClick={() => this.toogleMenu()} icon='align justify' title="Show/Hide Place List" />

          <Map center={location}
            places={list.places}
            selectedPlace={selectedPlace}
            selectPlace={(place) => this.selectPlace(place)} />

          <PlaceDetails place={detail.place} 
            loading={detail.loading} show={detail.show}  error={detail.error}
            close={() => this.showHideDetails(false)} />

        </LoadScript>

      </div>
    )
  }

}

export default NeighborhoodMapApp;
