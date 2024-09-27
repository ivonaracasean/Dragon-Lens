import { RendererDefn } from '../renderers/fieldRenderers';

export type DragonFieldKey =
    | 'head.hitpoints'
    | 'head.leftEye.color'
    | 'head.rightEye.color'
    | 'body.chest.hitpoints'
    | 'body.chest.stomach.contents'
    | 'body.leftWing.hitpoints'
    | 'body.rightWing.hitpoints';

export const dragonFieldDefs: Record<DragonFieldKey, RendererDefn> = {
    'head.hitpoints': 'number',
    'head.leftEye.color': { type: 'dropdown', options: ['blue', 'green'] },
    'head.rightEye.color': { type: 'dropdown', options: ['blue', 'green'] },
    'body.chest.hitpoints': 'number',
    'body.chest.stomach.contents': 'string',
    'body.leftWing.hitpoints': 'number',
    'body.rightWing.hitpoints': 'number',
};
