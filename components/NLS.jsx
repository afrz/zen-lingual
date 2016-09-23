import React, { PropTypes } from 'react';
import { intlHelperShape } from './type';

/** Stateless component to provide Native Language Support.
  Allow seamless translation.
*/
const NLS = (props, context) => {  
  //retrieve NLS from context to format message
  const formatMessage = context.intl.nls(props.ns, props);
  return React.createElement(props.parent, null, formatMessage);
}

NLS.defaultProps = {
  parent: 'span'
};

NLS.propTypes = {
  //i18n look up key (as namespace)
  ns: PropTypes.string.isRequired,
  parent : PropTypes.string
};

NLS.contextTypes = {
  intl : intlHelperShape
}

export default NLS;
