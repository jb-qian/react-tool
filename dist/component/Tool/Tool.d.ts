declare function Mounted(target: Function): void;
declare function readonly(...args: any): any;
declare const _default: {
    Rem: {
        set: (size?: number) => void;
        get: (size?: number) => number;
    };
    PX: (size?: number) => {
        html: HTMLElement;
        px: number;
    };
    Mounted: typeof Mounted;
    readonly: typeof readonly;
};
export default _default;
