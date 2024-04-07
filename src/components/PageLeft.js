import axios from "axios";
import { useState } from "react";
import { ClipLoader } from 'react-spinners';
import { Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import Sidebar from "./Sidebar";

function PageLeft() {
  const theme = useTheme();
  const [handles, setHandles] = useState([]);
  const [query, setQuery] = useState('');
  const [claudeRes, setClaudeRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchData = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post('http://127.0.0.1:8000/answer_query/', { user_query: query, 
      handles_mentioned: handles });
      // const themesArray = res.data.split(/\d+\./).filter(item => item.trim() !== '');
      // setClaudeRes(themesArray);
      setClaudeRes(res.data);
      setLoading(false);
    } catch (error) {
      console.log('error fetching data', error);
    }
  }

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? claudeRes.length - 1 : prevIndex - 1));
    } else if (direction === 'right') {
      setActiveIndex((prevIndex) => (prevIndex === claudeRes.length - 1 ? 0 : prevIndex + 1));
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', color: 'black' }}>
        <h2 style={{color: theme.palette.primary.main}}>Storia</h2>
        <form onSubmit={fetchData} style={{marginTop: '10px'}}>
          <label className="input-label">Enter Twitter handles or urls, separated by commas to retrieve tweets:</label> <br />
          <TextField fullWidth style={{marginBottom: '20px'}}className="input" id="standard-basic" label="ex. elonmusk, sama" variant="standard" onChange={(e) => setHandles(e.target.value)}/><br />
          <label className="input-label">What is your question?</label><br />
          <TextField fullWidth className="input" id="standard-basic" label="ex. Tell me how these indivuals feel about space" variant="standard" onChange={(e) => setQuery(e.target.value)}/><br />
          <Button variant="text" type="submit">Search</Button>
        </form>
        <br />
        <h3>Analysis: </h3>
        <p style={{marginTop: '30px'}}>
          {loading ? <ClipLoader color={theme.palette.primary.main} /> : ''}
        </p>
        <div className="cards" style={{ position: 'relative', height: '300px', overflow: 'auto' }}>
  {claudeRes}
      </div>
        <div className="navigation" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="text"
            style={{ marginRight: '10px' }}
            onClick={() => handleSwipe('left')}
          >
            &lt; Previous
          </Button>
          <Button
            variant="text"
            onClick={() => handleSwipe('right')}
          >
            Next &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PageLeft;

