import type { Schema, Struct } from '@strapi/strapi';

export interface SeoOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_seo_open_graphs';
  info: {
    displayName: 'OpenGraph';
    icon: 'alien';
  };
  attributes: {
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images' | 'files'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    ogType: Schema.Attribute.Enumeration<['article', 'website']> &
      Schema.Attribute.DefaultTo<'article'>;
    ogUrl: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'seo.open-graph': SeoOpenGraph;
    }
  }
}
