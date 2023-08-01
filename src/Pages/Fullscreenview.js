// import React, { useEffect } from 'react'
// import {  useNavigate, useParams } from 'react-router-dom'

// const Fullscreenview = (props) => {
//     const navigate=useNavigate()
//     const {url}=useParams()
//     useEffect(()=>{
//         console.log(url)
//     },[])
   
//     const handleClick=()=>{
//         navigate("/")
//     }

//     const copying=()=>{
//         let input=url
//         input.select();
//         navigator.clipboard.writeText(input)
//         props.alerting("Copyied to clipboard!","success")
//         }
//   return (
//     <div>
//         <button className='btn btn-primary' onClick={handleClick}>Back</button>
//         <button className="btn btn-primary mx-2" onClick={()=>{copying(url)}}>Copy </button>

//       <img src={url} alt="" />

//     </div>
//   )
// }

// export default Fullscreenview

