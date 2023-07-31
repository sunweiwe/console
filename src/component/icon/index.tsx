import React from 'react';
import './index.less';
import './iconfont';

function Icon(props: any) {
  const { icon, className = '', ...other } = props;

  return (
    <svg className={`sliver-icon ${className}`} {...other} aria-hidden='true'>
      <use xlinkHref={`#${icon}`} />
    </svg>
  );
}
export default Icon;
