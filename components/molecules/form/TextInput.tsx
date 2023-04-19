import style from "./form.module.scss"
import classnames from "classnames";
import { useController } from "react-hook-form";

type Props = {
    name: string,
    label?: string,
    placeholder?: string,
    control: any,
    rules: object,
    hidden?: boolean,
    defaultValue?: string,
    inputType?: string,
    min?: string,
    max?: string,
    id?: string,
    color?: string
}

export default function TextInput({name, label, placeholder, control, rules, inputType = 'text', defaultValue = '', min, max, id, color}: Props){

    const {
        field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields, errors }
    } = useController({name, control, rules, defaultValue});

    return(
        <div className={classnames(style.fieldItem, {[style.error]: invalid}, style[color])}>
            {label &&
            <label className={style.label}>{label}</label>
            }
            <input
                id={id}
                className={style.textInput}
                ref={ref}
                type={inputType}
                placeholder={placeholder}
                min={min}
                max={max}
                {...inputProps}
            />
            {invalid &&
                <div className={style.message}>{errors[name].message}</div>
            }
        </div>
    );

}
