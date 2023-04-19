import style from "./form.module.scss"
import classnames from "classnames";
import { useController } from "react-hook-form";

type Props = {
    name: string,
    label?: string,
    control: any,
    rules: object,
    defaultValue?: string,
    options: Array<{value: string, text: string}>
    emptyText?: string
}

export default function SelectInput({name, label, control, rules, defaultValue = '', options, emptyText = 'Please select'}: Props){

    const {
        field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields, errors }
    } = useController({name, control, rules, defaultValue});

    return(
        <div className={classnames(style.fieldItem, {[style.error]: invalid})}>
            {label &&
                <label className={style.label}>{label}</label>
            }
            <select
                className={style.textInput}
                ref={ref}
                {...inputProps}
            >
                <option>{emptyText}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                ))}
            </select>
            {invalid &&
                <div className={style.message}>{`Invalid input`}</div>
            }
        </div>
    );

}
