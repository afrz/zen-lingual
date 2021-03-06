import React from 'react';
import { connect } from 'react-redux';

import i18n from '../lib/i18n';
import { intlStateShape, intlHelperShape } from './type';
import { nls, localize } from '..';

/** High Order Component used to :
  - connect to internationalization state from store
  - provide internationalization helpers to the sub component tree
*/
export default function LocaleProvider(Component) {

  //wrapper for internationalization
  const i18nWrapper = React.createClass({

    propTypes: {
      intl: intlStateShape
    },

    childContextTypes: {
      intl: intlHelperShape
    },

    getChildContext() {
      return this.intlHelpers;
    },

    //ensure that i18n engine is synced with the redux state
    syncWithStore({ intl }) {

      //intl helpers injected in props + context
      //keep as an instance property to avoid uncessary recomputation
      this.intlHelpers = {
        intl: {
          nls,
          localize,
          //re-init and keep locale information
          locale: i18n.init(intl).locale
        }
      }
    },

    componentWillMount() {

      //sync as soon as possible because whole UI depends on it...
      this.syncWithStore(this.props);
    },

    componentWillReceiveProps(nextProps) {

      //only resync if current locale has changed
      if (nextProps.intl.currentLocale !== this.props.intl.currentLocale) {
        this.syncWithStore(nextProps);
      }
    },

    render() {

      //here we swap the 'intl' property from redux state with our intl helper (same than in context)
      const enhancedProps = Object.assign({}, this.props, this.intlHelpers);
      return React.createElement(Component, enhancedProps);
    }
  })

  //eventually connect wrapper to internationalization shape
  return connect(
    (state) => ({
      intl: state.intl
    })
  )(i18nWrapper);
}
