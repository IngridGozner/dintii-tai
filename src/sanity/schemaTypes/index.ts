import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { authorType } from './authorType'
import { siteInfoType } from './siteInfoType'
import { treatmentType } from './treatmentType'
import { treatmentGroupType } from './treatmentGroupType'
import { postType } from './postType'
import { articleType } from './articleType'
import { galleryType } from './galleryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, siteInfoType, categoryType, authorType, treatmentType, treatmentGroupType, postType, articleType, galleryType],
}
