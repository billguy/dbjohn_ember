import { ActiveModelSerializer } from 'active-model-adapter';

export default class BlogPostSerializer extends ActiveModelSerializer{
  primaryKey = 'permalink';
  attrs = {
    createdAt: { serialize: false },
    updatedAt: { serialize: false },
  };
}
