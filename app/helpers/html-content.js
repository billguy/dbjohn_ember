import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function htmlContent(content) {
  return htmlSafe(content);
}

export default helper(htmlContent);
