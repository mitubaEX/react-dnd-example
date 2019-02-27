import * as React from 'react'
import { DragLayer } from 'react-dnd'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  const x = currentOffset.x
  const y = currentOffset.y
  const transform = `translate(${x}px, ${y}px) scale(1.05)`

  return {
    WebkitTransform: transform,
    transform: transform,
  }
}

class CustomDragLayer extends React.Component {
  render() {
    const { item, itemType, isDragging, currentOffset } = this.props
    if (!isDragging) {
      return null
    }

    if (itemType === 'item') {
      return (
        <div style={layerStyles}>
          <div style={getItemStyles(currentOffset)}>
            {item.name}
          </div>
        </div>
      )
    }
    return null;
  }
}

export default DragLayer(collect)(CustomDragLayer)
