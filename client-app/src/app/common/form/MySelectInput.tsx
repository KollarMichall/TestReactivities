import { useField } from "formik";
import { FunctionComponent } from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface MySelectInputProps {
    placeholder: string;
    name: string;
    options: {text: string, value: string}[];
    label?: string;
}
 
const MySelectInput: FunctionComponent<MySelectInputProps> = (props: MySelectInputProps) => {
    const [field, meta, helpers] = useField(props.name);
    return (  
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
            clearable
            options={props.options}
            value={field.value || null}
            onChange={(_e, d) => helpers.setValue(d.value)}
            onBlur={() => helpers.setTouched(true)}
            placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}
 
export default MySelectInput;