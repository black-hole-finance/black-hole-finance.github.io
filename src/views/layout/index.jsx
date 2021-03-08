import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import Header from "./header";
import Footer from "./footer";

import Home from '../pages/home'

export default function() {
    return (
        <Router>
            <div>
                <Header/>
                <Switch>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </Router>
    )
}
