import logo from './logo.svg';
import './App.css';
import Gallery from './Pages/Gallery';
import Splashscreen from './Pages/Splashscreen';
import { useState } from 'react';
import Alert from './Pages/Alert';


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

  return (
    <div>
 
    <Splashscreen>
    <Alert alert={alertt} />
    <Gallery alerting={alerting}/>
    </Splashscreen>
   
  
    </div>
  );
}

export default App;
