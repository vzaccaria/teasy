import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import AppContainer from '../containers/AppContainer';
import HomePageContainer  from '../containers/HomePageContainer';
import AboutPageContainer from '../containers/AboutPageContainer';
import PreviewContainer   from '../containers/PreviewContainer';


export default (
    <Route path="/" handler={AppContainer}>
        <DefaultRoute name="settings" handler={HomePageContainer} />
        <Route path="preview/:wid" handler={PreviewContainer} />
        <Route name="about" handler={AboutPageContainer} />
    </Route>
);
