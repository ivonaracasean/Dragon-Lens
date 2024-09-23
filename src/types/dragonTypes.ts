export type Hitpoint = number;
export type Color = 'blue' | 'green';

export interface Dragon {
    body: Body;
    head: Head;
}

export interface Body {
    chest: Chest;
    leftWing: Wing;
    rightWing: Wing;
}

export interface Head {
    leftEye: Eye;
    rightEye: Eye;
    hitpoints: Hitpoint;
}

export interface Eye {
    color: Color;
}

export interface Chest {
    stomach: Stomach;
    hitpoints: Hitpoint;
}

export interface Stomach {
    contents: any[];
}

export interface Wing {
    hitpoints: Hitpoint;
}

export const dragonData: Dragon = {
    body: {
        chest: {
            hitpoints: 10,
            stomach: {
                contents: ['the adventurer'],
            },
        },
        leftWing: { hitpoints: 5 },
        rightWing: { hitpoints: 5 },
    },
    head: { hitpoints: 5, leftEye: { color: 'blue' }, rightEye: { color: 'green' } },
};
