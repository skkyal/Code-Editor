import React from 'react'
import Editor from '../components/Editor'
import Nav from '../components/Nav'
import {useState,useEffect} from 'react'
import {useHistory,useLocation} from 'react-router-dom'

const MainEditor = () => {
    const history=useHistory();
    const location=useLocation();

    const [code, setCode] = useState('');
    const [js, setJs] = useState('');
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');

    const [title, setTitle] = useState('');

    const random=()=>{
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i <5; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    };
    
    useEffect(() => {
        if(localStorage.getItem('auth-token')===null){
            history.push('/login');
        }
        if(location.state)
        setTitle(location.state.title);
        else setTitle(random);
    }, [history,location]);

    useEffect(() => {
        const code=`
        <html>
        <head>
            <title>${title}</title>
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
    }, [html,css,js,title,setCode]);

    const onSave=async()=>{
        const req={html,js,css,title};

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
