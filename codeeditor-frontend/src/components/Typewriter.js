import React,{useState,useEffect} from 'react'

const Typewriter = ({content,classText,initialTime,speed,icon}) => {
    const [text, setText] = useState('');

    let i=0;
    function typeWriter() {
        if (i < content.length) {
            setText((prev)=>prev+content.charAt(i));
            i++;
            setTimeout(typeWriter, speed);
        }
    };
    useEffect(() => {
        setTimeout(typeWriter, initialTime);
    }, [])

    return (
        <div className={classText}>
            {icon ? <i className={icon}></i> :null }
            {text}
        </div>
    )
}

export default Typewriter
