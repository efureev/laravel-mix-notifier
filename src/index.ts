import fs from 'fs'
import path from 'path'
import mix from 'laravel-mix'
import WebpackNotifierPlugin from 'webpack-notifier'

interface PackageJson {
  version?: string
  description?: string
}

export type Options = {
  title?: string
  contentImage?: string
  version?: string
  showVersion?: boolean
}

export class LaravelMixNotifier {
  config: Options = {}

  name(): string {
    return 'notify'
  }

  private parsePackage(): PackageJson | null {
    const packagePath = path.resolve(Mix.paths.root('package.json'))

    if (!fs.existsSync(packagePath)) {
      return null
    }

    return require(packagePath)
  }

  public register(options: Options = {}): void {
    const pkg = this.parsePackage()

    this.config = {
      title:
        options.title || (pkg ? pkg.description : undefined) || 'Your Package',
      version: options.version
        ? options.version
        : pkg
        ? pkg.version
        : undefined,
      showVersion:
        options.showVersion === true || options.showVersion === undefined,
    }

    if (options.contentImage) {
      const pI = path.resolve(Mix.paths.root(options.contentImage))
      if (fs.existsSync(pI)) {
        this.config.contentImage = pI
      }
    }
  }

  public webpackPlugins() {
    console.log(this.config)
    const version = this.config.showVersion
      ? this.config.version
        ? `[${this.config.version}] `
        : ''
      : ''

    return [
      new WebpackNotifierPlugin({
        title: version + this.config.title,
        alwaysNotify: Config.notifications.onSuccess,
        contentImage: this.config.contentImage,
      }),
    ]
  }
}

mix.extend('notify', new LaravelMixNotifier())
