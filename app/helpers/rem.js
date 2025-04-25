/* eslint-disable prettier/prettier */
import { helper } from '@ember/component/helper';

export default helper(function rem([id,r]) {
    id=parseInt(id);
    r=parseInt(r);
  return id%r==0;
});
