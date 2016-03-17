import React from 'react'
import ReactDOM from 'react-dom'
import { Router, DefaultRoute, Route, Link, IndexRoute, hashHistory, useRouterHistory} from 'react-router'
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

//Components
import Linkband from 'src/js/components/linkband/linkband';
import HomePage from 'src/js/components/pages/HomePage';
import DefaultPage from 'src/js/components/pages/DefaultPage';


//Styles
import 'src/styles/main.scss!';
import 'src/styles/mwf_en-us_default.min.css!';

import data from 'src/js/data/data.json!';


const Index = data.routes.reduce(function(result) {
    if(result.type !== 'IndexRoute') {
        return false
    }
    return result;
});

const Routes = data.routes.filter(function(result) {
    if(result.type === 'IndexRoute') {
        return false
    }
    return true;
}).map(function(result) {
    return result
});

class App extends React.Component {

    
    render() {
        return (
            <div className="grid">
                <Linkband routes={this.props.routes} params={this.props.params}/>
                <TransitionGroup component="div" transitionName="page-transition"
                                 transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname,
                        data: data
                        })}
                </TransitionGroup>
            </div>
        );
    }
}

ReactDOM.render(
        <Router history={appHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} title={Index.title}/>
                {Routes.map(function(result, id) {
                    return <Route component={DefaultPage} key={id} path={result.path} title={result.title}/>;
                })}
            </Route>
        </Router>
    , document.getElementById('app')
);
