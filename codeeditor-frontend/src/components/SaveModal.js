import React from 'react'

const SaveModal = ({onSave,setTitle,setSaveModel,setAccess,valid}) => {
    const changePublic=(e)=>{
        if(e.target.checked)
        setAccess(1);
    }
    const changePrivate=(e)=>{
        if(e.target.checked)
        setAccess(0);
    }

    return (
        <div className="savemodel-main">
            <div className="savemodel-container">
                <div className="savemodel-close" onClick={()=>setSaveModel(false)}><i className="fas fa-times"></i></div>
                { valid?<div style={{color:'red',fontSize:'14px'}}>Enter a Title</div>:null }
                <input className="savemodel-title" type="text" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)}></input>
                <div className="savemodel-checkbox">
                    <input type="radio" id="public" name="type" value="public" checked='checked' onChange={changePublic}></input>
                    <label htmlFor="public">Public</label>
                    <span>    </span>
                    <input type="radio" id="private" name="type" value="private" onChange={changePrivate}></input>
                    <label htmlFor="private">Private</label>
                    <div className="savemodel-btn" onClick={onSave}>Save</div>
                </div>
            </div>
        </div>
    )
}


export default SaveModal
