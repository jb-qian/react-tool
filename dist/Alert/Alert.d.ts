/**
 * @param default 点击取消时调用
 * @param primary 点击确定时调用
 * @param title 提示标题
 * @param subtitle 提示内容
 * @param noDefault 设置没有取消按钮
 * @param noPrimary 设置没有确定按钮
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
