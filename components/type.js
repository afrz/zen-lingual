import { PropTypes } from 'react';

//shape of redux intl state
export const intlStateShape = PropTypes.shape({
  defaultLocale: PropTypes.string.isRequired,
  currentLocale: PropTypes.string
});

//shape of intl helpers
export const intlHelperShape = PropTypes.shape({
  nls: PropTypes.func.isRequired,
  localize: PropTypes.func.isRequired,
  locale: PropTypes.string
});
