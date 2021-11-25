"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaravelMixNotifier = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const laravel_mix_1 = __importDefault(require("laravel-mix"));
const webpack_notifier_1 = __importDefault(require("webpack-notifier"));
class LaravelMixNotifier {
    config = {};
    name() {
        return 'notify';
    }
    parsePackage() {
        const packagePath = path_1.default.resolve(Mix.paths.root('package.json'));
        if (!fs_1.default.existsSync(packagePath)) {
            return null;
        }
        return require(packagePath);
    }
    register(options = {}) {
        const pkg = this.parsePackage();
        this.config = {
            title: options.title || (pkg ? pkg.description : undefined) || 'Your Package',
            version: options.version
                ? options.version
                : pkg
                    ? pkg.version
                    : undefined,
            showVersion: options.showVersion === true || options.showVersion === undefined,
        };
        if (options.contentImage) {
            const pI = path_1.default.resolve(Mix.paths.root(options.contentImage));
            if (fs_1.default.existsSync(pI)) {
                this.config.contentImage = pI;
            }
        }
    }
    webpackPlugins() {
        console.log(this.config);
        const version = this.config.showVersion
            ? this.config.version
                ? `[${this.config.version}] `
                : ''
            : '';
        return [
            new webpack_notifier_1.default({
                title: version + this.config.title,
                alwaysNotify: Config.notifications.onSuccess,
                contentImage: this.config.contentImage,
            }),
        ];
    }
}
exports.LaravelMixNotifier = LaravelMixNotifier;
laravel_mix_1.default.extend('notify', new LaravelMixNotifier());
//# sourceMappingURL=index.js.map