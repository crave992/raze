import style from "./form.module.scss"
import classnames from "classnames";
import { useController } from "react-hook-form";

type Props = {
    name: string,
    label?: string,
    control: any,
    rules: object,
    hidden?: boolean,
    defaultValue?: boolean,
}

export default function Checkbox({name,label, control, rules, defaultValue = false}: Props){

    const {
        field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields, errors }
    } = useController({name, control, rules, defaultValue});

    console.log(errors);

    return(
        <div className={classnames(style.fieldCheckboxItem, {[style.error]: invalid})}>
            <div className={style.checkbox}>
            <div className={style.checkbox_wrapper}>
                <input
                    ref={ref}
                    type={`checkbox`}
                    {...inputProps}
                />
                <div className={style.checkbox_box}></div>
            </div>
            {label &&
            <label className={style.label}>{label}</label>
            }
            </div>

            {invalid &&
            <div className={style.message}>{errors[name].message}</div>
            }
        </div>
    );

}
