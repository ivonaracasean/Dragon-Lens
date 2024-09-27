import { Option } from '../utils/utils';

export type RendererDefn =
    | 'string'
    | 'number'
    | { type: 'dropdown'; options: Option[] }
    | { type: 'object'; fields: ObjectDefn<any> };

export type ObjectDefn<T> = Partial<Record<keyof T, RendererDefn>>;