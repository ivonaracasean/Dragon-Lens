import React from 'react';
import { toDisplayForm } from '../utils/utils';
import { GetRenderer, RendererDefn } from './fieldRenderers';

interface SimpleFormFieldProps {
    id: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    renderInput: RendererDefn;
    getRenderer: GetRenderer;
    required?: boolean;
}

export const SimpleFormField: React.FC<SimpleFormFieldProps> = ({
                                                                    id,
                                                                    value,
                                                                    onChange,
                                                                    renderInput,
                                                                    getRenderer,
                                                                    required = true,
                                                                }) => {
    const label = toDisplayForm(id);

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            {getRenderer(renderInput)(id, value, onChange, required)}
        </div>
    );
};
