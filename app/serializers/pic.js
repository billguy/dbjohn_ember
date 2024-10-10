import { ActiveModelSerializer } from 'active-model-adapter';

export default class PicSerializer extends ActiveModelSerializer{
  primaryKey = 'permalink';
  attrs = {
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  };
}
