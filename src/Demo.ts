import {child, identityLens} from "./utils/lensUtils";
import {Dragon, dragonData} from "./types/dragonTypes";

const dragonLens = identityLens<Dragon>();
console.log(dragonLens.get(dragonData))

const dragonBody = child(dragonLens, "body");