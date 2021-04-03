import Editor from '../components/Editor'
import Nav from '../components/Nav'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import React from 'react'

const Specific = () => {
    const [code, setCode] = useState(``);
    const [js, setJs] = useState('');
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    
    const {_id}=useParams();

    useEffect(() => {
      const code=`
      <html>
      <head>
          <style>${css}</style>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      </head>
      <body>
          ${html}
      <script>${js}</script>
      </body>
      `;
      setTimeout(() => {
          setCode(code);
         }, 250);
         //console.log(timeout);
    }, [html,css,js,setCode]);


    
    useEffect(() => {
        const fetchCode = async()=>{
            try{
                const res = await fetch('http://localhost:8000/editor/'+_id);
                if(res.ok){
                    const data = await res.json();
                    console.log(data);

                    setHtml(data.html);
                    setJs(data.js);
                    setCss(data.css);
                }
                else{
                    alert('Error');
                }
            }catch(err){
                console.log(err);
            }
        };
        fetchCode();
    }, [_id]);
  

    const onSave=async()=>{
        const req={_id,html,js,css};
        try{
          const res = await fetch('http://localhost:8000/editor/'+_id,{
                method:'PUT',
                headers:{
                  'Content-type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            if(res.ok){
                const data = await res.json();
                if(!data) alert('Sorry, Unable to Update');
                else alert('Updated');
            }
            else{
                alert('Error');
            }
        }catch(err){
          console.log(err);
        }
    };

    return (
      <div className="page-container">
        <Nav onSave={onSave} />
        <Editor html={html} css={css} js={js} setHtml={setHtml} setCss={setCss} setJs={setJs} />
        <div className="frame">
          <iframe
              srcDoc={code}
              title="Document"
              /*Title option*/
              /*sandbox option*/
              /*frameBorder option*/
              /*width-height option*/
              /*Title option*/
            ></iframe>
        </div>
        
      </div>
    )
}

export default Specific
