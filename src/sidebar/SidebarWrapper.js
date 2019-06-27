import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VerticalSidebar from './Sidebar'
import {
  Button,
  Sidebar,
} from 'semantic-ui-react'


class SidebarWrapper extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    places: PropTypes.array.isRequired,
    onPlaceMouseOver: PropTypes.func,
    onPlaceMouseOut: PropTypes.func
  }

  state = {
    dimmed: false,
    visible: true,
  }

  toogleMenu = () => () =>
    this.setState(prevState => ({ visible: !prevState.visible }))

  render() {
    const { visible } = this.state
    const { query, places, onPlaceMouseOver, onPlaceMouseOut } = this.props

    return (
      <div>
        <Sidebar.Pushable>
          <VerticalSidebar query={query} visible={visible} 
            places={places} 
            onPlaceMouseOver={(place) => onPlaceMouseOver(place)}
            onPlaceMouseOut={(place) => onPlaceMouseOut(place)} />
          <Sidebar.Pusher dimmed={false && visible}>
            <Button className="Menu-Toggle" onClick={this.toogleMenu()} icon='align justify' />

            {this.props.children}

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarWrapper