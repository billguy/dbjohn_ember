import { ActiveModelSerializer } from 'active-model-adapter';

export default class SloganSerializer extends ActiveModelSerializer{
  primaryKey = 'id';
  attrs = {
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  };
}
