import { inject } from '@ember/service';
import Controller from '@ember/controller';

export default class AboutController extends Controller {
  @inject session;
}
