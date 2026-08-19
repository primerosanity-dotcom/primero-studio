import type { SchemaTypeDefinition } from "sanity";
import { opinia } from "./opinia";
import { pakiet } from "./pakiet";
import { realizacja } from "./realizacja";
import { usluga } from "./usluga";
import { ustawienia } from "./ustawienia";

export const schemaTypes: SchemaTypeDefinition[] = [
  pakiet,
  usluga,
  realizacja,
  opinia,
  ustawienia,
];
