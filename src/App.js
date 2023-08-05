import logo from './logo.svg';
import './App.css';
import Gallery from './Pages/Gallery';
import Splashscreen from './Pages/Splashscreen';
import { useEffect, useState } from 'react';
import Alert from './Pages/Alert';
import Fullscreenview from './Pages/Fullscreenview'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  const [alertt, setalertt] = useState(null);

  const alerting=(message,type)=>{
    setalertt({
      msg:message,
      type:type,
    })
      setTimeout(() => {
       setalertt(null)
      }, 3000);
  
  }
  const [isSplashEnded, setIsSplashEnded] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashEnded(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

  return (
    <div>
 <Router>
    <Alert alert={alertt} />
  
   <Routes>
    <Route path='/' element={isSplashEnded ?<Splashscreen /> : <Gallery  alerting={alerting}/>} />
    <Route path='/fullscreenview/:id' element={ <Fullscreenview alerting={alerting}/>}/>
   </Routes>
 </Router>

 
  
    </div>
  );
}

export default App;
