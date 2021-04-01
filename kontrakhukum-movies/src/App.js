// import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import Navbar from './Components/Navbar'
import Home from './Pages/HomeFunctionComponent'
import Footer from './Components/Footer'

function App() {
  return (
    <Segment
      inverted
      style={{
        minHeight: "100vh",
        color: 'white',
        padding: '0',
        display: 'flex',
        flexDirection: 'column'
      }}
      className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/*'>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
        <Footer />
    </Segment>
  );
}

export default App;
