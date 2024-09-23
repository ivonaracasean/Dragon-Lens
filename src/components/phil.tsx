import React from 'react';
import {LensAndPath} from "../utils/lensUtils";
import {Color} from "../types/dragonTypes";

interface InputFieldProps<Main, T> {
    lens: LensAndPath<Main, T>
}

type InputFieldTypeClass<T> = {
    zero: T
    findTInEvent: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => T | undefined;
    Display: (props: {
        value: T | undefined;
        onChange: (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => void;
    }) => JSX.Element;
};

const StringInputFieldType: InputFieldTypeClass<string | any[]> = {
    zero: "",
    findTInEvent: e => e.target.value,
    Display: ({value, onChange}) => (
        <input type="text" value={value ?? ''} onChange={onChange}/>
    ),
};

const NumberInputFieldType: InputFieldTypeClass<number> = {
    zero: 0,
    findTInEvent: e => {
        const val = e.target.value;
        return val === '' ? undefined : +val;
    },
    Display: ({value, onChange}) => (
        <input
            type="number"
            value={value !== undefined ? value : ''}
            onChange={onChange}
        />
    ),
};

const DropdownInputFieldType: InputFieldTypeClass<Color> = {
    zero: "blue",
    findTInEvent: e => e.target.value as Color,
    Display: ({value, onChange}) => (
        <select value={value ?? ''} onChange={onChange}>
            <option value="">Select an option</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
        </select>
    ),
};
/*const getFieldType = <T extends string | number>(
    type: 'text' | 'number' | 'dropdown',
    options?: T[]
): InputFieldTypeClass<T> => {
    if (type === 'text') {
        return StringInputFieldType;
    } else if (type === 'number') {
        return NumberInputFieldType as InputFieldTypeClass<T>;
    } else if (type === 'dropdown') {
        return DropdownInputFieldType as InputFieldTypeClass<T>;
    } else {
        throw new Error('Unsupported type');
    }
};*/

type changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
const InputField = <Main, T>(ft: InputFieldTypeClass<T>, main: Main, setMain: (main: Main) => void) => (
    props: InputFieldProps<Main, T>) => {
    const {lens} = props;
    const handleChange: changeHandler = (e) => setMain(lens.set(main, ft.findTInEvent(e)!));
    const Display = ft.Display

    return (
        <div style={{marginBottom: '1rem'}}>
            <label>
                {lens.path.join(".")}:{' '}
                <Display value={lens.get(main)} onChange={handleChange}/>
            </label>
        </div>
    );
};
type InputField<Main, T> = (props: InputFieldProps<Main, T>,) => JSX.Element;

type Components<Main> = {
    NumberField: InputField<Main, number>
    StringField: InputField<Main, string | any[]>
    DropdownField: InputField<Main, Color>
}

export function useComponents<Main>(main: Main, setMain: (main: Main) => void): Components<Main> {
    return {
        NumberField: InputField(NumberInputFieldType, main, setMain),
        StringField: InputField(StringInputFieldType, main, setMain),
        DropdownField: InputField(DropdownInputFieldType, main, setMain)
    }
}
