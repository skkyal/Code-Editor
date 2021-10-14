import { Controlled as CodeMirror } from "react-codemirror2";
import ResizablePanels from "./ResizablePanels";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/javascript/javascript.js");

const Editor = ({ html, css, js, setHtml, setJs, setCss }) => {
  return (
    <div className="editor-container">
      <ResizablePanels>
        <div className="editor">
          <div className="editor-heading">
            <i className="fab fa-html5"></i> HTML
            <span className="refresh" onClick={() => setHtml("")}>
              <i className="fas fa-redo"></i>
            </span>
          </div>

          <CodeMirror
            value={html}
            options={{
              mode: "xml",
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setHtml(value);
            }}
            onChange={(editor, value) => {
              //console.log('controlled', {editor});
            }}
          />
        </div>

        <div className="editor">
          <div className="editor-heading">
            <i className="fab fa-js"></i> JavaScript
            <span className="refresh" onClick={() => setJs("")}>
              <i className="fas fa-redo"></i>
            </span>
          </div>
          <CodeMirror
            value={js}
            options={{
              mode: "javascript",
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              //console.log(value);
              setJs(value);
            }}
            onChange={(editor, value) => {
              //console.log('controlled', {editor});
            }}
          />
        </div>

        <div className="editor">
          <div className="editor-heading">
            <i className="fab fa-css3-alt"></i> CSS
            <span className="refresh" onClick={() => setCss("")}>
              <i className="fas fa-redo"></i>
            </span>
          </div>
          <CodeMirror
            value={css}
            options={{
              mode: "css",
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              //console.log(value);
              setCss(value);
            }}
            onChange={(editor, value) => {
              //console.log('controlled', {editor});
            }}
          />
        </div>
      </ResizablePanels>
    </div>
  );
};

export default Editor;
