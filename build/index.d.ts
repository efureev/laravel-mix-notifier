export declare type Options = {
    title?: string;
    contentImage?: string;
    version?: string;
    showVersion?: boolean;
};
export declare class LaravelMixNotifier {
    config: Options;
    name(): string;
    private parsePackage;
    register(options?: Options): void;
    webpackPlugins(): Plugin[];
}
