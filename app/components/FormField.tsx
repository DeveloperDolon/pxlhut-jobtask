import { FormFieldProps } from "../types/formTypes";

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name, 
    register,
    error,
    valueAsNumber,
    className,
    label
}) => {
    return (
        <div className="mx-auto w-full flex flex-col gap-1">
            {label && <label className="text-gray-700 dark:text-gray-300 md:text-sm text-xs">{label}</label>}
            <input
                className={`input-field block md:px-3 md:py-2 px-2 py-1 rounded-sm dark:bg-white bg-[#e8f0fe] md:placeholder:text-sm placeholder:text-xs  ${className}`}
                type={type}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
            />
            {error && <> <span className="error-message text-red-500 md:text-xs text-[10px]">{error.message}</span></>}
        </div>
    );
};

export default FormField;
