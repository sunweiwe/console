import React, { useLayoutEffect, useState } from 'react';

function Code() {
  const [count, setCount] = useState(0);

  //  render之前调用 相当于componentDidMount，同步阻塞执行，之后调用 useEffect
  useLayoutEffect(() => {
    console.log(`useLayoutEffect - count=${count}`);
    // 耗时的操作
    const pre = Date.now();
    while (Date.now() - pre < 500) {}

    if (count === 0) {
      setCount(10 + Math.random() * 200);
    }
  }, [count]);

  return <div onClick={() => setCount(0)}>{count}</div>;
}

export default Code;
