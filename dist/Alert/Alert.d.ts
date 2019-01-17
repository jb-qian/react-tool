export interface Props {
    default?: () => void;
    title: string;
    subtitle?: string;
    noDefault?: boolean;
    noPrimary?: boolean;
    primary?: () => void;
}
declare const App: (props: Props) => void;
export default App;
