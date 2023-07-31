import React, { useState } from "react";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
// import zhHans from 'bytemd/lib/locales/zh_Hans.json'; // 默认是英文版，我们替换成中文的
// import gemoji from '@bytemd/plugin-gemoji';
// import highlight from '@bytemd/plugin-highlight-ssr';
// import mediumZoom from '@bytemd/plugin-medium-zoom';
// import 'highlight.js/styles/vs.css';

// style
import "bytemd/dist/index.min.css";
import "./index.less";

const plugins = [
  gfm(),

  // Add more plugins here
];

function WorkSpace() {
  const [value, setValue] = useState("");
  return (
    <div className='writing'>
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
}

export default WorkSpace;
