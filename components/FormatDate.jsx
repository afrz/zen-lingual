import React, { PropTypes } from 'react';
import { intlHelperShape } from './type';

/** Stateless component to provide Native Language Support for date & time.
  Allow seamless localization.
*/
const FormatDate = (props, context) => {

  //escape if no value provided
  const { value } = props;
  if (!value) return null;

  //retrieve localize method from context to format message
  const date = context.intl.localize(value, props);
  return React.createElement(props.parent, null, date);
}

FormatDate.defaultProps = {
  parent : 'span',
  //default to DD/MM/YYYY
  format : 'L'
};

FormatDate.propTypes = {
  value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  parent : PropTypes.string,
  input : PropTypes.string,
  format : PropTypes.string.isRequired
};

FormatDate.contextTypes = {
  intl : intlHelperShape
}

export default FormatDate;
