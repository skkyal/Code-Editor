import React from 'react'
import Editor from '../components/Editor'
import Nav from '../components/Nav'
import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const MainEditor = () => {
    const history=useHistory();

    const [code, setCode] = useState(``);
    const [js, setJs] = useState('');
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');

    useEffect(() => {
        if(localStorage.getItem('auth-token')===null){
            history.push('/login');
        }
    }, [history]);

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

    const onSave=async()=>{
        const req={html,js,css};

        try{
        const res = await fetch('http://localhost:8000/editor',{
                method:'POST',
                headers:{
                'Content-type': 'application/json',
                'auth-token':localStorage.getItem('auth-token')
                },
                body: JSON.stringify(req)
            });
            const data = await res.json();
            console.log(data);
            if(res.ok){
                history.push(`/user/${data.code}`);
            }
            else{
                if(data.message==="Invalid Token")
                history.push('/login');
                localStorage.removeItem('auth-token');
            }
            
        }catch(err){
            console.log(err);
        }
    };
    return (
        <div className="page-container">
            <Nav onSave={onSave} isDelete={false} isIcon={true} />
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

export default MainEditor
