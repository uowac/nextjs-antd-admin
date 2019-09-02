import React, { PureComponent } from 'react'

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5)
}

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
