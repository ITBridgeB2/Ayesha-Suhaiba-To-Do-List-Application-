import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import { BrowserRouter,Link} from 'react-router-dom';


const root=ReactDOM.createRoot(
    document.getElementById('root'));
  
    root.render(
     <div>
        <BrowserRouter>
        <div>
            
        <Link ></Link> 
        </div>
        <App></App>
      </BrowserRouter>
     </div>
    );
