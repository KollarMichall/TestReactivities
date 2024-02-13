import { useField } from "formik";
import { FunctionComponent } from "react";
import { Form, Label } from "semantic-ui-react";

interface MyTextAreaInputProps {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}
 
const MyTextAreaInput: FunctionComponent<MyTextAreaInputProps> = (props: MyTextAreaInputProps) => {
    const [field, meta] = useField(props.name);
    return (  
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}
 
export default MyTextAreaInput;