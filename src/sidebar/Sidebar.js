import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Menu,
  Sidebar,
  Header,
  Label
} from 'semantic-ui-react'

class VerticalSidebar extends Component {

  static propTypes = {
    query: PropTypes.string.isRequired,
    places: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    onPlaceMouseOver: PropTypes.func,
    onPlaceMouseOut: PropTypes.func
  }

  state = {
    loading: false
  }

  updateQuery(query) {
    console.log(query);
  }

  openPlace(place) {
    window.alert(place.name);
  }

  render() {
    const { query, places, selectedPlace, visible, onPlaceMouseOver, onPlaceMouseOut } = this.props
    const { loading } = this.state

    return (
      <Sidebar
        as={Menu}
        animation='push'
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
          <Input
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            loading={loading}
            icon='search'
            placeholder='Search...' />
        </Menu.Item>

        {
          places.length && places
            .map((place) => (
              <Menu.Item as='a' key={place.id} tabIndex='0' 
                onMouseOut={() => onPlaceMouseOut(place)} 
                onMouseOver={() => onPlaceMouseOver(place)}
                onFocus={() => console.log('123123')} 
                active={selectedPlace && selectedPlace.id === place.id}
                onClick={() => this.openPlace(place)} >
                <strong>{place.name}</strong>
                <p>{place.location.address}</p>
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
      </Sidebar>
    )
  }

}

export default VerticalSidebar