import React, {useState} from 'react';
import {LensAndPath, lensBuilder} from '../utils/lensUtils';
import {Dragon, dragonData} from '../types/dragonTypes';
import {useComponents} from "../renderers/useComponents";
import {dragonFieldDefs, DragonFieldKey} from '../types/dragonFieldDefs';

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

const lensMap: Record<DragonFieldKey, LensAndPath<Dragon, any>> = {
    'head.hitpoints': headHitpointsLens,
    'head.leftEye.color': leftEyeLens,
    'head.rightEye.color': rightEyeLens,
    'body.chest.hitpoints': chestHitpointsLens,
    'body.chest.stomach.contents': stomachContentsLens,
    'body.leftWing.hitpoints': leftWingLens,
    'body.rightWing.hitpoints': rightWingLens,
};

const DragonEditor = () => {
    const [dragon, setDragon] = useState<Dragon>(dragonData);
    const { Field } = useComponents(dragon, setDragon);

    const fieldKeys: DragonFieldKey[] = [
        'head.hitpoints',
        'head.leftEye.color',
        'head.rightEye.color',
        'body.chest.hitpoints',
        'body.chest.stomach.contents',
        'body.leftWing.hitpoints',
        'body.rightWing.hitpoints',
    ];

    return (
        <div>
            <h1>Edit Dragon</h1>
            {fieldKeys.map((key) => (
                <Field
                    key={key}
                    id={key}
                    renderer={dragonFieldDefs[key]}
                    lens={lensMap[key]}
                />
            ))}
            <pre>{JSON.stringify(dragon, null, 2)}</pre> {/* To display the updated dragon object */}
        </div>
    );
};

export default DragonEditor;
