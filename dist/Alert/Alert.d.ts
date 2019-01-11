interface Props {
    default?: () => void;
    title: string;
    noDefault?: boolean;
    noPrimary?: boolean;
    primary?: () => void;
}
declare const App: (props: Props) => void;
export default App;
