import { FunctionComponent } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface LoadingComponentProps {
    inverted?: boolean;
    content?: string;
}
 
const LoadingComponent: FunctionComponent<LoadingComponentProps> = ({inverted = true, content = 'Loading...'}: LoadingComponentProps) => {
    return (  
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    );
}
 
export default LoadingComponent;