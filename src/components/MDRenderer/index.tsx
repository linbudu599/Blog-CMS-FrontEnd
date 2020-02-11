import React, { useState, useEffect } from "react";
import marked from "marked";

interface IMDProps {
  content: string;
}
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  breaks: false,
  smartLists: true,
  smartypants: false
});
const MDRenderer: React.FC<IMDProps> = ({ content }) => {
  let [html, setHTML] = useState(content);

  useEffect(() => {
    setHTML(marked(content || ""));
    return () => {};
  }, [content]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  );
};

export default MDRenderer;
