import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Menu from './components/Menu';
import Error from './pages/Error';
import Produto from './pages/Produto';

const Routes = () => {
    return(
        <BrowserRouter>
            <Menu />
            <Switch>                
                <Route exact path="/" component={Home} />
                <Route exact path="/sobre" component={Sobre} />
                <Route exact path="/contato" component={Contato} />
                <Route path="/produto/:id" component={Produto} />

                <Route path="*" component={Error} />
            </Switch> 
        </BrowserRouter>    
    )
}
export default Routes;