import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Menu,
  Sidebar,
  Header,
  Label
} from 'semantic-ui-react'
import { DebounceInput } from 'react-debounce-input'

class PlaceList extends Component {

  static propTypes = {
    query: PropTypes.string.isRequired,
    places: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    selectPlace: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
  }

  state = {

  }

  updateQuery(query) {
    this.props.updateQuery(query);
  }

  render() {
    const { query, places, selectedPlace, visible, selectPlace, loading } = this.props

    return (
      <Sidebar
        as={Menu}
        animation='overlay'
        direction='left'
        inverted
        vertical
        visible={visible}
        width='wide'
      >

        <Menu.Item>
          <Header as='h1' inverted>Neighborhood Map</Header>
        </Menu.Item>

        <Menu.Item>
          <div className={`ui icon input ${loading ? 'loading' : ''}`}>
            <DebounceInput
              placeholder="Filter places..."
              minLength={2}
              debounceTimeout={300}
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            /><i aria-hidden="true" className="search icon"></i>
          </div>
        </Menu.Item>

        {
          places.length > 0 && places
            .map((place) => (
              <Menu.Item as='a' key={place.id} tabIndex='0' role="link" href="#" aria-label={place.name}
                active={(selectedPlace && selectedPlace.id === place.id) || place.active}
                onClick={() => selectPlace(place)} >
                <h2 className="Place-Item-Name">{place.name}</h2>
                <p className="Place-Item-Address">{place.location.address}</p>
                <p>
                  {
                    place.categories && place.categories.length && place.categories.map(category => (
                      <Label as='span' key={category.name} color='blue' horizontal>{category.name}</Label>
                    ))
                  }
                </p>
              </Menu.Item>
            ))
        }

        <Menu.Item>
          <div className="List-Reference">Source: <a href="https://foursquare.com" target="_blank" rel="noopener noreferrer" aria-label="Source of Data: foursquare.com">foursquare.com</a></div>
        </Menu.Item>

      </Sidebar>
    )
  }

}

export default PlaceList