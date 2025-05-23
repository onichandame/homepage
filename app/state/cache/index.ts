import { createCache, } from "cache-manager";
import Keyv from "keyv";

export const cache = createCache({ stores: [new Keyv()], ttl: process.env.DISABLE_CACHE ? 0 : 300 * 1000 })