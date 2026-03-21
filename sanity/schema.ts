import type { SchemaTypeDefinition } from 'sanity'
import { event } from './schemas/event'
import { strawBaleGardenPage } from './schemas/strawBaleGardenPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, strawBaleGardenPage],
}
