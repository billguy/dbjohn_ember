import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import { ActiveModelSerializer } from 'active-model-adapter';

export default class PostSerializer extends ActiveModelSerializer.extend(
  EmbeddedRecordsMixin,
) {
  primaryKey = 'permalink';
  attrs = {
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  };
}
