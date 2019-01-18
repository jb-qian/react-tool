/**
 * @param
 * default 点击取消时调用
 * primary 点击确定时调用
 * title 提示标题
 * subtitle 提示内容
 * noDefault 设置没有取消按钮
 * noPrimary 设置没有确定按钮
 */
export interface Props {
    default?: () => void;
    primary?: () => void;
    title: string;
    subtitle?: string;
    noDefault?: boolean;
    noPrimary?: boolean;
}
declare const App: (props: Props) => void;
export default App;
