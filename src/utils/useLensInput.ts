import { useState } from 'react';
import { LensAndPath } from './lensUtils';

// Custom hook for managing the lens input fields
export function useLensInput<T>(initialValue: T, lens: LensAndPath<T, any>) {
    const [value, setValue] = useState(lens.get(initialValue));

    const handleChange = (newValue: any) => {
        setValue(newValue);
        return lens.set(initialValue, newValue);
    };

    return { value, onChange: handleChange };
}
