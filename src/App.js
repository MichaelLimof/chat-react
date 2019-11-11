import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';



import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/Navbar';

const theme = createMuiTheme({

  palette: {
    primary: {
      light: '#72cff8',
      main: '#2196f3',
      dark: '#0d47a1',
      contrastText: '#ffff'

    }, secondary: {
      light: '#c5cae9',
      main: '#3f51b5',
      dark: '#512da8',
      contrastText: '#3f51b5'
    }
  }, typography: {
    useNextVariants: true,
  }

})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <div className="container">
            <Navbar />

            <Switch>
              <Route exact path="/home" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />

            </Switch>
          </div>
        </Router>
      </div>

    </MuiThemeProvider>
  );
}

export default App;
