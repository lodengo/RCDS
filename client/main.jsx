import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import i18n from 'meteor/universe:i18n';

function getLang () {
  return (
      navigator.languages && navigator.languages[0] ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      'en-US'
  );
}

i18n.setLocale(getLang());

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
