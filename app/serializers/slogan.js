import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'id',
  attrs: {
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  }
});
