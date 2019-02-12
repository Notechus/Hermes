import React from 'react'
import PropTypes from 'prop-types'
import { Button, UncontrolledTooltip } from 'reactstrap'

const TrainingTableActionCell = ({ color, tooltipId, size, label, tooltip, icon, click }) => (
  <>
    <Button
      className="btn-icon"
      color={color}
      id={'tooltip' + tooltipId}
      size={size}
      type="button"
      onClick={click}
    >
      <i className={icon} />
      {label}
    </Button>{' '}
    <UncontrolledTooltip delay={0} target={'tooltip' + tooltipId}>
      {tooltip}
    </UncontrolledTooltip>
  </>
)

TrainingTableActionCell.propTypes = {
  color: PropTypes.oneOf(['info', 'success', 'danger', 'warning']),
  tooltipId: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.string,
  tooltip: PropTypes.string,
  icon: PropTypes.string,
  click: PropTypes.func,
}

export default React.memo(TrainingTableActionCell)
