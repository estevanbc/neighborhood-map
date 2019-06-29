import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Dimmer,
  Loader,
  Image,
  Rating,
  List,
  Message,
  Label
} from 'semantic-ui-react'
import FocusLock, { AutoFocusInside } from 'react-focus-lock';

class PlaceDetails extends Component {

  static propTypes = {
    place: PropTypes.object,
    show: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    close: PropTypes.func.isRequired
  }

  state = {

  }

  close() {
    this.props.close()
  }

  render() {
    const { show, place, loading, error } = this.props

    return (
      <Modal
        open={show}
        onClose={() => this.close()}
        size='tiny'
        closeIcon
      >

        {loading && (
          <Modal.Content>
            <Dimmer active inverted>
              <Loader size='medium'>Loading</Loader>
            </Dimmer>
          </Modal.Content>
        )}

        <FocusLock
          disabled={!show}>

          {error && (
            <div className="Map-Detail">
              <Message negative color='red'>
                <Message.Header>We're sorry =(</Message.Header>
                <p>There was a search error</p>
              </Message>
            </div>
          )}

          {place && (
            <div>
              <Image src={place.bestPhoto ? `${place.bestPhoto.prefix}800x500${place.bestPhoto.suffix}` : 'http://via.placeholder.com/800x500?text=No%20Photo'} className="Map-Detail-Image" fluid wrapped alt={`${place.name}'s best photo`} />
              <div className="Map-Detail">
                <AutoFocusInside>
                  <h1 className="Map-Detail-Name" tabIndex="0" aria-label={place.name}>{place.name}</h1>
                </AutoFocusInside>
                <p className="Map-Detail-Address" tabIndex="0" aria-label={`Adress: ${place.location.address}`}>{place.location.address}</p>
                  <p tabIndex="0" aria-label={`Categories: ${place.categories.map(c => c.name).join(',')}`}>
                  {
                    place.categories && place.categories.length && place.categories.map(category => (
                      <Label as='span' key={category.name} color='blue' horizontal aria-label={`Category: ${category.name}`}>{category.name}</Label>
                    ))
                  }
                </p>
                <div className="Map-Detail-Rating" tabIndex="0" aria-label={`Rating: ${place.rating} of 10`}>
                  <Rating rating={place.rating} maxRating={10} icon='star' disabled tabIndex="-1" />
                </div>
                {place.price && (
                  <div className="Map-Detail-Rating" tabIndex="0" aria-label={`Price: ${place.price.message}`}>
                    <h2 className="Hours-Title">Price</h2>
                    <p>{place.price.message}</p>
                  </div>
                )}
                {place.hours && (
                  <div className="Map-Detail-Hours">      
                    <h2 className="Hours-Title">Opening Hours</h2>
                    <List>
                      {
                        place.hours.timeframes.length > 0 && place.hours.timeframes
                          .map((hour) => (
                            <List.Item key={hour.days} className="Hours-Item" tabIndex="0" aria-label={`Open: ${hour.days} - ${hour.open.map(o => o.renderedTime).join(',')}`}>
                              {hour.days} - {hour.open.map(o => o.renderedTime).join(',')}
                            </List.Item>
                          ))
                      }
                    </List>
                  </div>
                )}
                {place.contact && (
                  <div className="Map-Detail-Contact">
                    <h2 className="Contact-Title">Contact</h2>
                    <List>
                      {place.contact.facebookUsername && (
                        <List.Item>
                          <List.Icon name='phone' />
                          <List.Content tabIndex="0" aria-label={`Phone: ${place.contact.formattedPhone}`}>{place.contact.formattedPhone}</List.Content>
                        </List.Item>
                      )}
                      {place.contact.facebookUsername && (
                        <List.Item>
                          <List.Icon name='facebook' />
                          <List.Content ><a href={`https://facebook.com/${place.contact.facebookUsername}`} target="_blank" rel="noopener noreferrer" aria-label={`Facebook username: ${place.contact.facebookUsername}`}>{place.contact.facebookUsername}</a></List.Content>
                        </List.Item>
                      )}
                      {place.url && (
                        <List.Item>
                          <List.Icon name='world' />
                          <List.Content><a href={place.url} target="_blank" rel="noopener noreferrer" aria-label={`Site: ${place.url}`}>{place.url}</a></List.Content>
                        </List.Item>
                      )}
                    </List>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="Detail-Reference">Source: <a href="https://foursquare.com" target="_blank" rel="noopener noreferrer" aria-label="Source of Data: foursquare.com">foursquare.com</a></div>
        </FocusLock>
      </Modal>
    )
  }

}

export default PlaceDetails