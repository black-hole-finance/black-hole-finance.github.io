import React from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import zh_CN from './cn'
import en_US from './en'

class Inter extends React.Component {
  render() {
    let { locale, localeMessage, children } = this.props
    return (
      <IntlProvider
        key={locale}
        defaultLocale='en'
        locale={locale}
        messages={localeMessage}
      >
        {children}
      </IntlProvider>
    )
  }
}

function chooseLocale(val) {
  let _val = val || navigator.language.split('_')[0]
  switch (_val) {
    case 'en':
      return en_US
    case 'zh':
      return zh_CN
    default:
      return en_US
  }
}

let mapStateToProps = (store) => {
  return {
    locale: store.locale.locale,
    localeMessage: chooseLocale(store.locale.locale),
  }
}

export default connect(mapStateToProps)(Inter)
