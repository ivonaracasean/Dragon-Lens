interface InputFieldProps<T> {
    label: string;
    type: 'text' | 'number' | 'dropdown';
    value: T | undefined;
    onChange: (value: T) => void;
    options?: T[]; // For dropdown, the options can be of type T
}

const InputField = <T extends string | number | any[]>({
                                                           label,
                                                           type,
                                                           value,
                                                           onChange,
                                                           options,
                                                       }: InputFieldProps<T>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newValue = type === 'number' ? +e.target.value as T : e.target.value as T;
        onChange(newValue as T);
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label>
                {label}:{' '}
                {type === 'dropdown' && options ? (
                    <select value={value} onChange={handleChange}>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input type={type} value={value} onChange={handleChange} />
                )}
            </label>
        </div>
    );
};

export default InputField;
