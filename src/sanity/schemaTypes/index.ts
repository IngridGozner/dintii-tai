import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { siteInfoType } from './siteInfoType';
import { treatmentType } from './treatmentType';
import { treatmentGroupType } from './treatmentGroupType';
import { articleType } from './articleType';
import { galleryType } from './galleryType';
import { dictionaryType } from './dictionaryType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    siteInfoType,
    treatmentType,
    treatmentGroupType,
    articleType,
    galleryType,
    dictionaryType,
  ],
};
