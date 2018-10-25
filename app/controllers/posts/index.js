import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  queryParams: ["page", "perPage"],
  content: {},
  page: alias("content.page"),
  perPage: alias("content.perPage"),
  totalPages: alias("content.totalPages")
});
