// Lens type definition: used to focus on a child property within a larger object
export type LensAndPath<Main, Child> = {
    get: (main: Main) => Child | undefined;
    set: (main: Main, child: Child) => Main;
    path: string[];
};

// Create an identity lens for a given object
export function identityLens<T>(): LensAndPath<T, T> {
    return {
        get: (main: T) => main,  // Simply return the main object
        set: (main: T, child: T) => child,  // Replace the main object with the child
        path: []
    };
}

// Create a lens that focuses on a specific child property in a larger object
export function child<Main, T, K extends keyof T>(lens: LensAndPath<Main, T>, key: K): LensAndPath<Main, T[K]> {
    return {
        get: (main: Main) => lens.get(main)?.[key],  // Get the child property
        set: (main: Main, child: T[K]) => {
            const parent = lens.get(main);  // Get the parent object
            if (parent === undefined) return main;  // If the parent is undefined, return the main object unchanged
            const updatedParent = { ...parent, [key]: child };  // Create a new object with the updated child
            return lens.set(main, updatedParent as T);  // Set the updated parent in the main object
        },
        path: [...lens.path, key.toString()]
    };
}

// LensBuilder class for easier lens creation and focus chaining
export class LensBuilder<Main, Child> {
    private _lens: LensAndPath<Main, Child>;

    constructor(lens: LensAndPath<Main, Child>) {
        this._lens = lens;
    }

    // Focus on a child property within the current lens focus
    focusOn<K extends keyof Child>(key: K): LensBuilder<Main, Child[K]> {
        return new LensBuilder(child(this._lens, key));
    }

    // Return the built lens
    build() {
        return this._lens;
    }
}

// Helper function to start building a lens
export function lensBuilder<T>() {
    return new LensBuilder(identityLens<T>());
}
