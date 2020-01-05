module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/infinite-game/dist'
    : '/'
}