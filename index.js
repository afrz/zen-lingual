import i18n from './lib/i18n';
//export engine
export default i18n;

//export helpers as stand-alone methods
export const nls = i18n.translate.bind(i18n);
export const localize = i18n.localize.bind(i18n);

//export all actions/reducer creators
export { changeLocale, setTranslations, getServerLocale, generateIntlReducer }
from './lib/state';

//export collector
export {
  default as LocaleCollector
}
from './lib/collector';
