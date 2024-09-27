import React from 'react';
import { FieldComponentsFn, FieldComponentProps } from './fieldComponents';
import { SimpleFormField } from './SimpleFormField';
import { getRenderer } from './fieldRenderers';

export const useComponents: FieldComponentsFn = <T,>(
    formData: T,
    set: (t: T) => void
) => {
    const Field = ({
                       id,
                       renderer = 'string',
                       lens,
                   }: FieldComponentProps<T>) => {
        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
            const newValue = e.target.value;
            const updatedFormData = lens.set(formData, newValue);
            set(updatedFormData);
        };

        const value = lens.get(formData);

        return (
            <SimpleFormField
                id={id}
                value={value}
                onChange={handleChange}
                renderInput={renderer}
                getRenderer={getRenderer}
                required={true}
            />
        );
    };

    return {
        Field,
    };
};
