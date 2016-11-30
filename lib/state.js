const I18N_UPDATE_LOCALE = 'I18N_UPDATE_LOCALE';
const I18N_SYNC_LOCALE = 'I18N_SYNC_LOCALE';
const I18N_LOAD_TRANSLATIONS = 'I18N_LOAD_TRANSLATIONS';

/** FSA : Update local in state
  @param {string} locale - locale ISO code to set (ex : fr, en)
*/
const setLocale = (locale) => ({

  type: I18N_UPDATE_LOCALE,
  payload: locale
})

/** RSA : Change current locale
  @param {string} locale -locale ISO code to set (ex : fr, en)
  @param {bool} syncBack - [optionnal] indicates if local shall also be synchronized with back-office.
*/
export const changeLocale = (locale, syncBack = false) => (dispatch, getState) => {

  const newLocale = locale ? locale.toLowerCase() : '';

  const state = getState();
  const { intl: { currentLocale } } = state;
  if (newLocale && currentLocale !== newLocale) {

    //store in browser for easy access
    localStorage['locale'] = newLocale;
    //update local in state
    dispatch(setLocale(newLocale));

    if (syncBack) {
      //eventually indicates to back-office that locale has changed
      const { session: { user } } = state;
      return dispatch({
        type: I18N_SYNC_LOCALE,
        payload: { IsoLang: newLocale },
        api: {
          endpoint: `/users/${user}/`,
          method: 'PATCH'
        }
      });
    }
  }
}

/** Get locale stored in browser
  @returns {string} : locally stored locale
*/
const getBrowserLocale = () => localStorage['locale'];

/** Get locale as defined in back-office
  @param {object} state - redux state tree
  @returns {string} : locale ISO code.
*/
export const getServerLocale = (state) => {
  const { settings: { User } } = state;
  return User ? User.IsoLang : 'fr';
}

/** FSA : Dynamically loads translations to be used for formatting messages.
  For static translations, you shall use a pre-initialized object passed to 'generateIntlReducer'.
  @param {object} translations - contains all translation along with its defined locale
 */
export const setTranslations = (translations) => {

  if (!translations.locale) throw new Error(`A locale shall be supplied in translation object.`);
  return {
    type: I18N_LOAD_TRANSLATIONS,
    payload: translations
  }
}

const defaultState = {
  defaultLocale: 'en'
}

/** Generate a intl reducer from a intl state.
  @param {object} intlState - Preinitialized internationalization object state
    @param {string} defaultlocale - mandatory default locale (used as fallback)
    @param {string} - dynamic property name whose value is the translation table.
      Ex : {
        defaultlocale : 'en'
        en : {
          hello : 'hi'
        },
        fr : {
          hello : 'bonjour'
        }
      }
  @returns function : intl reducer
*/
export function generateIntlReducer(intlState = defaultState) {

  //add current locale automatically to speed up initialization process
  const initialState = Object.assign({}, intlState, {
    currentLocale: getBrowserLocale() || intlState.defaultLocale
  });

  //returns an reducer for storing intl state.
  return function intlReducer(state = initialState, action) {

    switch (action.type) {

      case I18N_UPDATE_LOCALE:
        return Object.assign({}, state, {
          currentLocale: action.payload
        });

      case I18N_LOAD_TRANSLATIONS:
        return Object.assign({}, state, {
          [action.payload.locale.toLowerCase()]: action.payload
        });
    }
    return state;
  }
}
