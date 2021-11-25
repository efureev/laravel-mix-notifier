const mix = require('laravel-mix')
require('./build')

mix
  .disableNotifications()
  //
  // .notify()
  // mix.notify({})
  // .notify({ title: 'Hello!' })
  // .notify({ title: 'Hello!', contentImage: 'assets/logo.png' })
  .notify({
    title: 'Hello!',
    contentImage: 'assets/logo.png',
    // showVersion: false,
  })
