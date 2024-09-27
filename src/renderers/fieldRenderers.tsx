import React from 'react';
import { normalizeOptions, Option, toDisplayForm } from '../utils/utils';

export type FieldRenderer = (
    id: string,
    value: any,
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void,
    required: boolean
) => JSX.Element;

export const renderStringInput: FieldRenderer = (
    id,
    value,
    onChange,
    required = true
) => (
    <input
        type="text"
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        aria-required={required}
        aria-label={toDisplayForm(id)}
    />
);

export const renderNumberInput: FieldRenderer = (
    id,
    value,
    onChange,
    required = true
) => (
    <input
        type="number"
        id={id}
        name={id}
        value={value !== undefined ? value : ''}
        onChange={onChange}
        aria-required={required}
        aria-label={toDisplayForm(id)}
    />
);

export const renderDropDown = (options: Option[]): FieldRenderer => (
    id,
    value,
    onChange,
    required = true
) => (
    <select
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        aria-required={required}
        aria-label={toDisplayForm(id)}
    >
        <option value="">Select {toDisplayForm(id).toLowerCase()}</option>
        {normalizeOptions(options).map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

export type RendererDefn =
    | 'string'
    | 'number'
    | { type: 'dropdown'; options: Option[] };

export type GetRenderer = (renderer: RendererDefn) => FieldRenderer;

export const getRenderer: GetRenderer = (renderer: RendererDefn) => {
    if (renderer === 'number') {
        return renderNumberInput;
    } else if (typeof renderer === 'object' && renderer.type === 'dropdown') {
        return renderDropDown(renderer.options);
    } else {
        return renderStringInput; // Default to string input
    }
};
