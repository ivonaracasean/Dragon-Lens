import React, { useState } from 'react';
import InputField from './InputField';
import {LensAndPath, lensBuilder} from '../utils/lensUtils';
import { Dragon, dragonData, Color } from '../types/dragonTypes';
import {useLensInput} from "../utils/useLensInput";

// Define lenses for various parts of the dragon
export const bodyLens = lensBuilder<Dragon>().focusOn('body');
export const headLens = lensBuilder<Dragon>().focusOn('head');
export const chestLens = bodyLens.focusOn('chest');

export const chestHitpointsLens = chestLens.focusOn('hitpoints').build();
export const stomachContentsLens = chestLens.focusOn('stomach').focusOn('contents').build();
export const leftWingLens = bodyLens.focusOn('leftWing').focusOn('hitpoints').build();
export const rightWingLens = bodyLens.focusOn('rightWing').focusOn('hitpoints').build();

export const headHitpointsLens = headLens.focusOn('hitpoints').build();
export const leftEyeLens = headLens.focusOn('leftEye').focusOn('color').build();
export const rightEyeLens = headLens.focusOn('rightEye').focusOn('color').build();

const DragonEditor = () => {
    const [dragon, setDragon] = useState<Dragon>(dragonData);

    // Create a handler to update the dragon state based on the lens and new value
    const handleLensChange = <T,>(lens: LensAndPath<Dragon, T>, value: T) => {
        setDragon(lens.set(dragon, value));
    };

    // Component for handling different types of input fields
    const LensInputField = <T,>({ lens, type, options }: {
        lens: LensAndPath<Dragon, T>,
        type: 'text' | 'number' | 'dropdown',
        options?: T[] }) => {
        const { value, onChange } = useLensInput(dragon, lens);

        return (
            <InputField
                label={lens.path.join('.')}
                type={type}
                value={value}
                onChange={(newValue) => handleLensChange(lens, newValue)}
                options={options}
            />
        );
    };

    return (
        <div>
            <h1>Edit Dragon</h1>

            {/* Head Section */}
            <h2>Head</h2>
            <LensInputField lens={headHitpointsLens} type="number" />
            <LensInputField lens={leftEyeLens} type="dropdown" options={['blue', 'green'] as Color[]} />
            <LensInputField lens={rightEyeLens} type="dropdown" options={['blue', 'green'] as Color[]} />

            {/* Body Section */}
            <h2>Body</h2>
            <LensInputField lens={chestHitpointsLens} type="number" />
            <LensInputField lens={stomachContentsLens} type="text" />
            <LensInputField lens={leftWingLens} type="number" />
            <LensInputField lens={rightWingLens} type="number" />
        </div>
    );
};

export default DragonEditor;
