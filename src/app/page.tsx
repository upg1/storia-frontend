'use client'
import ReactFlowMindMap from '../components/ReactFlowMindMap'
import PageLeft from '../components/PageLeft'
import {Provider} from 'react-redux'
import store from '../store'
import colors from './colorConfig';
import { ThemeProvider } from '@mui/material';



// import { Neo4jProvider, createDriver } from 'use-neo4j'

const AURA_API_KEY = process.env.AURA_API_KEY
// Create driver instance
// const driver = createDriver('neo4j+s', '127.0.0.1', 7687, 'neo4j', AURA_API_KEY)
// driver.onCompleted = (summary) => {
//   console.log('Query completed:', summary); 
// };

// driver.onError = (error) => {
//   console.log('Neo4j Driver Error:', error); 
// };
 

const HomePage = () => {
  return (
    // <AppLayout>
        <ThemeProvider theme={colors}>
          <Provider store={store}>
              <div className='react-flow-container'>
              <div className="PageContainer">
                <div className="PageLeft">
                  <PageLeft/>
                </div>
              </div>
            </div>
        </Provider>
      </ThemeProvider>
    // </AppLayout>
  );
};

export default HomePage;
