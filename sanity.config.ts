import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { farmPhotoAssetSource } from './src/sanity/components/FarmPhotoAssetSource'

export default defineConfig({
  name: 'forevermore-farm',
  title: 'Forevermore Farm',
  projectId: 'd05q9u13',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  form: {
    image: {
      assetSources: (previousSources) => [...previousSources, farmPhotoAssetSource],
    },
  },
})
