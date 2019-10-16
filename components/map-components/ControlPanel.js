/**
 * Description: Helper control panel in Map view to show current co-ordinates of marker
 * Author: Hieu Chu
 */

import React, { PureComponent } from 'react'

export default class ControlPanel extends PureComponent {
  render() {
    const { lat, lng } = this.props
    return (
      <div className="control-panel">
        <div>Latitude: {lat}</div>
        <div>Longitude: {lng}</div>
      </div>
    )
  }
}
