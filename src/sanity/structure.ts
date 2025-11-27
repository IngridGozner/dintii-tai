import type { StructureResolver } from 'sanity/structure';

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
      S.documentTypeListItem('dictionaryGeneral').title('Dictionary General'),
      S.documentTypeListItem('dictionaryNavigation').title(
        'Dictionary Navigation'
      ),
      S.documentTypeListItem('dictionaryEdit').title('Dictionary Edit'),
      S.documentTypeListItem('dictionaryPatient').title('Dictionary Patient'),
      S.documentTypeListItem('dictionaryTreatment').title(
        'Dictionary Treatment'
      ),
      S.documentTypeListItem('dictionaryFeedback').title('Dictionary Feedback'),
      S.documentTypeListItem('dictionaryForm').title('Dictionary Form'),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'siteInfo',
            'treatmentGroup',
            'treatment',
            'gallery',
            'article',
            'dictionaryGeneral',
            'dictionaryNavigation',
            'dictionaryEdit',
            'dictionaryPatient',
            'dictionaryTreatment',
            'dictionaryFeedback',
            'dictionaryForm',
          ].includes(item.getId()!)
      ),
    ]);
