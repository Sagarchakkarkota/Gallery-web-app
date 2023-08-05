import React, { useEffect, useRef, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

const Fullscreenview = (props) => {
    const ref=useRef(null)
    const navigate=useNavigate();
    let { id } = useParams();
    const [data, setData] = useState([]);
    const getdata = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos');
        const parseData = await res.json()
        console.log(parseData[id-1].id);
        setData(parseData[id-1])
    }

    useEffect(()=>{
        console.log("id",id)
        getdata();
        console.log(data);
    },[])
   
    const handleClick=()=>{
        navigate("/")
    }

    const handleCopy=()=>{
    //   let input=document.getElementById("img")
    //   input.select();
    //   navigator.clipboard.writeText(input.value)

      let imageUrl=document.getElementById("img").src

    let tempInput = document.createElement('input');
    tempInput.value = imageUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

      props.alerting("Copyied to clipboard!","success")
        }
  return (
    <div className='container' >
      
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Share</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <p>Copy URL</p> 
     <div className='d-flex justify-content-between'>
     {/* <input type='text' id='img' value={data.url} /> */}
     {data.url}
     <button className='btn btn-light' onClick={()=>{handleCopy(data.url)}}><i className="fa-solid fa-copy"></i></button>

     </div>
     
      </div>
      <div className="modal-footer">
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>
    <div className="d-flex my-2 justify-content-between">
        <button className='btn btn-primary' onClick={handleClick}><i className="fa-solid fa-arrow-left"></i></button>
        <button className="btn btn-primary mx-2" onClick={()=>{ref.current.click()}}><i className="fa-regular fa-share-from-square"></i> </button>
    </div>
    
    <div className="d-flex justify-content-center ">
        <img id='img' src={data.url} alt="" />
        

     </div>

    </div>
  )
}

export default Fullscreenview

