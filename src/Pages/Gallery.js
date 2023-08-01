import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Lazyload from './Lazyload';
import { useNavigate} from 'react-router-dom';
import '../App.css';
const Gallery = (props) => {
    const [data, setData] = useState([]);
    const [slicedData, setSlicedData] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

// const navigate=useNavigate()

    const getdata = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos');
        const parseData = await res.json()
        console.log(parseData)
        setSlicedData(parseData?.splice(0, 10))

        setData(parseData)
    }

    console.log("slicedData", slicedData)
    useEffect(() => {
        getdata();
    }, []);


    const fetchMoreData = () => {
        
        // setSlicedData(slicedData.concat(data.splice(latestindex,10)))

        setCurrentPageIndex((index) => index + 10);
        const latestIndex = currentPageIndex + 10;
        console.log("data.splice(0, latestIndex)", data.splice(0, latestIndex))
        setSlicedData(data.splice(0, latestIndex));
    }

    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prevSelected) => {
          if (prevSelected.includes(itemId)) {
            return prevSelected.filter((id) => id !== itemId);
          } else {
            return [...prevSelected, itemId];
          }
        });
      };


    const handleDelete = (index) => {
      
        setLoading(true)
        const newitems=(prevItems) => prevItems.filter((item) => !selectedItems.includes(item.id));
        setSelectedItems([]);
        setData(newitems)
        setSlicedData(newitems)
        props.alerting("deleted item","success")
        setLoading(false)
    }

    // const openFullview=(url)=>{
    //     navigate(`/fullview/${url}`)
    //     }
 


    return (
        
        <div className='container' style={{width:'100vw'}}>
             {loading && <Lazyload />}
            <div className='row'>
                
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    // inverse={true} //
                    hasMore={slicedData.length !== data}
                    loader={<h4><Lazyload/></h4>}
                >
                        <div className='row'> 
                        <ul > 
                    {slicedData.map((value, index) => {
                            return <div key={value.id} className='col-md-4' >
                           <li ><input type="checkbox" checked={selectedItems.includes(value.id)} onChange={() => handleCheckboxChange(value.id)}/></li>
                            <button onClick={() => handleDelete(value?.id)}  disabled={selectedItems.length === 0}>Delete</button>
                            <img src={value.url} alt="Your Image" className="img-fluid " />
                           {value.title}
                           
                        </div>

                     })
                    }
                     </ul>
                    </div>
                   

                </InfiniteScroll>
                <button onClick={fetchMoreData}>Neext</button>
            </div>
        </div >
    )
}

export default Gallery
