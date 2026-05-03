import { helper } from '@ember/component/helper';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export default helper(function formatDate([date], { format = 'LLLL' } = {}) {
  if (!date) return '';
  return dayjs(date).format(format);
});
