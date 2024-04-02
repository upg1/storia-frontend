import axios from "axios";
import { useState } from "react";
import {ClipLoader} from 'react-spinners'; 

function PageLeft() {
  const [handles, setHandles] = useState(''); 
  const [keywords, setKeywords] =  useState('');
  const [claudeRes, setClaudeRes] = useState([]);
  const [loading, setLoading] = useState(false); 
  
  
  const fetchData = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const res = await axios.post('http://127.0.0.1:3333/get-tweets-by-handles', { data: [handles, keywords] });
      // Split the string into individual points
      const themesArray = res.data.split(/\d+\./).filter(item => item.trim() !== '');
      setClaudeRes(themesArray);
      setLoading(false);
    } catch (error) {
      console.log('error fetching data', error);
    }
  }

  return (
    <div>
        <div style={{textAlign: 'center', color: 'black'}}>
          <h2>Storia</h2>
            <form onSubmit={fetchData}>
            <tag className="handles-label">Enter Twitter handles or urls, seperated by commas </tag> <br/>
            <input onChange={(e) => setHandles(e.target.value) }className="text-red" placeholder="ex. elonmusk,sama"></input><br/>
            <tag>Enter Keywords to Filter by</tag><br/>
            <input onChange={(e) => setKeywords(e.target.value)}placeholder="ex. science"></input><br/>
            <button type="submit">Search</button>
          </form>
          <br/>
          <h3>Analysis: </h3>
          {claudeRes ? claudeRes.map(theme => <p>{theme}</p>) : ''}
          <p>
            {loading ? <ClipLoader color="black" /> : ''}
          </p>
        </div>
    </div>
  )
}

export default PageLeft; 