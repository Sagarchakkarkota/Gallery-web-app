import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import FadeIn from 'react-fade-in';
const Gallery = (props) => {
    const [data, setData] = useState([]);
    const [slicedData, setSlicedData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const navigate = useNavigate()

    const getdata = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos');
        const parseData = await res.json()
 
        setSlicedData(parseData?.splice(0, 10))

        setData(parseData)
    }

    // console.log("slicedData", slicedData)
    useEffect(() => {
        getdata();
    }, []);


    const fetchMoreData = () => {

        setSlicedData(slicedData.concat(data.splice(0, 10)))
        // console.log("slicedData", slicedData)
        // console.log("changing data:", data)

    }

    const handleCheckboxChange = (itemId) => {
        const updatedItems = slicedData.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item 
        
        );
    

        setSlicedData(updatedItems);
        setSelectAll(updatedItems.every((item) => item.checked));
    };


    const handleSelectAllChange = () => {
        const updatedSelectAll = !selectAll;
        const updatedItems = slicedData.map((item) => ({
            ...item, checked: updatedSelectAll,
        }));
        setSlicedData(updatedItems);
        setSelectAll(updatedSelectAll);
    };

    const handleDeleteSelected = () => {
        const filteredItems = slicedData.filter((item) => !item.checked);
        // console.log("filteredItems :", filteredItems)

        setSlicedData(filteredItems);

        setSelectAll(false);
        props.alerting("deleted item", "success")


    };


    const fullScreenview = (id) => {
        navigate(`/fullscreenview/${id}`)
    }


    return (
        <div className='container bg-dark text-light' style={{ width: '100vw' }}>
            <div className='d-flex justify-content-center'><h1 className='my-5'>Gallery</h1></div>
            <div className='d-flex justify-content-end'>
                <label> <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
                    {" "}Select All
                </label>
                <button className='btn btn-light my-5' onClick={handleDeleteSelected}><i className="fa-solid fa-trash" ></i></button>
            </div>
            <div className='row'>
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    // inverse={true} //
                    hasMore={slicedData.length !== data}
                    loader={<h4>Loading...</h4>}
                >
                    <div className='row'>

                        {slicedData.map((value, index) => {
                            return <div key={value.id} className='col-md-4' >
                                <input type="checkbox" checked={value.checked} onChange={() => handleCheckboxChange(value.id)} />
                                <FadeIn>
                                    <div>
                                        <img src={value.url} alt="Your Image" onClick={() => { fullScreenview(value.id) }} className="img-fluid " />
                                        {value.title}
                                    </div>
                                </FadeIn>



                            </div>

                        })
                        }

                    </div>


                </InfiniteScroll>
            </div>
        </div >
    )
}

export default Gallery
