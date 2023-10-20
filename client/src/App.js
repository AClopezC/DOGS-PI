import './App.css'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Landing from './Landing/Landing'
import Home from './views/Home/Home'
import CardDetail from './components/CardDetail/CardDetail'
import FormPage from './views/FormPage/FormPage'

export default function App() {
   return (
      <div>
         <BrowserRouter>
            <Switch>
               <Route exact path={'/'} component={Landing} />
               <Route path={'/home'} component={Home} />
               <Route path={'/detail/:id'} component={CardDetail} />
               <Route path={'/create'} component={FormPage} />

            </Switch>
         </BrowserRouter>
      </div>
   );
}