import React, { Fragment } from "react";
import PropTypes from "prop-types";
import UncontrolledTooltip from "reactstrap/src/UncontrolledTooltip";
import Button from "reactstrap/src/Button";

const TrainingTableActionCell = ({
  color,
  id,
  size,
  label,
  tooltip,
  icon,
  click
}) => (
  <Fragment>
    <Button
      className="btn-icon"
      color={color}
      id={"tooltip" + id}
      size={size}
      type="button"
      onClick={click}
    >
      <i className={icon} />
      {label ? label : null}
    </Button>{" "}
    <UncontrolledTooltip delay={0} target={"tooltip" + id}>
      {tooltip}
    </UncontrolledTooltip>
  </Fragment>
);

TrainingTableActionCell.propTypes = {
  color: PropTypes.oneOf(["info", "success", "danger", "warning"]),
  id: PropTypes.number,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  label: PropTypes.string,
  tooltip: PropTypes.string,
  icon: PropTypes.string,
  click: PropTypes.func
};

export default TrainingTableActionCell;
