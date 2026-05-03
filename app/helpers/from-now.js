import { helper } from '@ember/component/helper';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default helper(function fromNow([date]) {
  if (!date) return '';
  return dayjs(date).fromNow();
});
