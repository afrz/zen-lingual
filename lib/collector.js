/**
  Locale ware house to collect all translations associated to ZEN packages.
*/
class LocaleCollector {

  constructor() {
    //internal storage
    this.storage = {};
  }

  /** Collect a new translation table.
    @param translations (object) : translation table to collect.
    Shall contain one single root property named as the corresponding locale. The value being the actual translations.
      Ex : {
        fr : {
          hello : 'Bonjour'
        }
      }
    @returns object : LocaleCollector instance (to chain calls).
  */
  declare(translations) {

    //merge translations by locale identifier
    Object.keys(translations).forEach(locale => {

      this.storage[locale] = Object.assign(this.storage[locale] || {}, translations[locale]);
    });
    return this;
  }

  /** Get the complete translation table.
    @param defaultLocale (string) : fallback locale to use by default.
    @param object : aggregate of all collected translation tables, which can be passed as is to the 'intl' state reducer.
  */
  extract(defaultLocale = 'fr') {

    return Object.assign(this.storage, {
      defaultLocale
    });
  }
}

//export singleton instance
export default new LocaleCollector();
