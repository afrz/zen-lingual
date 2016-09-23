import { formatMessage } from './format';
import moment from 'moment';

/** i18n core engine */
class i18n {

  constructor() {}

  /** Initialize Internationalization engine from a redux state
    @param intl (object) : redux state
  */
  init(intl /*, options = {}*/ ) {
    this.intl = intl;
    this.locale = intl.currentLocale;
    this.fallbackLocale = intl.defaultLocale;
    return this;
  }

  /** Transforms a i18n lookup key into its local translation
    @param key (string) : i18n lookup key
    @param placeholders (object) : key/values pairs to interlopate
    @return string : formatted string
  */
  translate(key, placeholders = {}) {

    //avoid to seek for translation if no locale exist yet
    if (!this.locale) return '';

    try {
      let rawMessage = this.fetchTranslation(this.intl, `${this.locale}.${key}`);
      if (!rawMessage && this.fallbackLocale) {
        //try fallback message if necessary
        rawMessage = this.fetchTranslation(this.intl, `${this.fallbackLocale}.${key}`);
      }
      return rawMessage ? formatMessage(rawMessage, placeholders) : key;

    } catch (err) {
      return key;
    }
  }

  /** Converts value into native local format
    @param value (string|number) : number or string date
    @param option (object) : options used to customize formatting.
      @param format (string) : expected output format (see moment API)
      @param input (string): [optionnal] format used by input date string
    @return string : formatted value
  */
  localize(value, options = {}) {

    const { format, input } = options;
    if (format) {
      //use moment to parse and re-format date
      return moment(value, input)
        .locale(this.locale)
        .format(format);
    }
    // if (typeof value === 'number') {
    //   if (Intl) {
    //     return new Intl.NumberFormat(this.locale, options).format(value);
    //   }
    // }
    return value;
  }

  /** Recusrively retrieve a raw message for translation table
    @param translations (object) : translation table
    @param key (string) : i18n lookup key
    @returns string : raw value corresponding to given key
  */
  fetchTranslation(translations, key) {

    if (!translations) return;

    const index = key.indexOf('.');
    if (index > -1) {
      return this.fetchTranslation(translations[key.substring(0, index)], key.substr(index + 1));
    }
    if (translations[key]) {
      return translations[key];
    }
    //throw new Error(`i18n key '${key}' not found.`);
  }
}

//export singleton instance
export default new i18n();
