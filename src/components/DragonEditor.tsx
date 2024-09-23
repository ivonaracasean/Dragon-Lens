import React, {useState} from 'react';
import InputField from './InputField';
import {LensAndPath, lensBuilder} from '../utils/lensUtils';
import {Dragon, dragonData, Color} from '../types/dragonTypes';
import {useLensInput} from "../utils/useLensInput";
import {useComponents} from "./phil";

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

    const {NumberField, StringField, DropdownField} = useComponents(dragon, setDragon)
    return (
        <div>
            <h1>Edit Dragon</h1>
            {/* Head Section */}
            <h2>Head</h2>
            <NumberField lens={headHitpointsLens}/>
            <DropdownField lens={leftEyeLens}/>
            <DropdownField lens={rightEyeLens}/>
            {/* Body Section */}
            <h2>Body</h2>
            <NumberField lens={chestHitpointsLens}/>
            <StringField lens={stomachContentsLens}/>
            <NumberField lens={leftWingLens}/>
            <NumberField lens={rightWingLens}/>
        </div>
    );
};

export default DragonEditor;
