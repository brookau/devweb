/* istanbul ignore next */
define(function(require) {
  return {
    navbar: require('./navbar/navbar'),
    footer: require('./footer/footer'),
    home: require('./home/home'),
    profile: require('./profile/profile'),
    login: require('./login/login'),
    dashboard: require('./dashboard/dashboard'),
    error: require('./error/error'),
    terms: require('./terms/terms'),
    about: require('./about/about'),
    post: require('./post/post'),
    test: require('./test/test'),
    ad: require('./ad-page/ad-page'),
    search: require('./search/search'),
    support: require('./support/support'),
    registration: require('./registration/registration'),
    gallery: require('./gallery/gallery'),
    hashtags: require('./hashtags/hashtags'),
    publicProfile: require('./publicProfile/publicProfile')
  };
});
