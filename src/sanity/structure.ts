import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('DintiiTai')
    .items([
      S.documentTypeListItem('siteInfo').title('SiteInfo'),
      S.documentTypeListItem('treatmentGroup').title('Treatment Groups'),
      S.documentTypeListItem('treatment').title('Treatments'),
      S.documentTypeListItem('gallery').title('Gallery'),
      S.documentTypeListItem('article').title('Posts'),
      S.documentTypeListItem('dictionary').title('Dictionary'),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['siteInfo', 'treatmentGroup', 'treatment', 'gallery', 'article', 'dictionary'].includes(item.getId()!),
      ),
    ])
