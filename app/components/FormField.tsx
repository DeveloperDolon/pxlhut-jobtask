import { FormFieldProps } from "../types/formTypes";

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name, 
    register,
    error,
    valueAsNumber,
    className
}) => {
    return (
        <>
            <input
                className={`input-field block md:px-3 md:py-2 rounded-lg dark:bg-white bg-[#e8f0fe] md:placeholder:text-sm placeholder:text-xs  ${className}`}
                type={type}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
            />
            {error && <> <span className="error-message text-red-500 md:text-xs text-[10px]">{error.message}</span></>}
        </>
    );
};

export default FormField;
