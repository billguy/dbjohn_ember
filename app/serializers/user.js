import { ActiveModelSerializer } from 'active-model-adapter';

export default class UserSerializer extends ActiveModelSerializer{
  primaryKey = 'id';
  attrs = {
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  };
}
