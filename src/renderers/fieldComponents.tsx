import { RendererDefn } from './fieldRenderers';
import { LensAndPath } from '../utils/lensUtils';

export interface FieldComponentProps<T> {
    id: string;
    renderer?: RendererDefn;
    lens: LensAndPath<T, any>;
}

export type FieldComponents<T> = {
    Field: (props: FieldComponentProps<T>) => JSX.Element;
};

export type FieldComponentsFn = <T>(
    formData: T,
    set: (t: T) => void
) => FieldComponents<T>;
