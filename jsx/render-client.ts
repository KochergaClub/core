import React from 'react';
import ReactDOM from 'react-dom';

function renderApp(props) {
    const component = require('./' + window['store'].component);
    const domContainerNode = document.getElementById('app-container');

    // Unmounting the component before mounting it again
    ReactDOM.unmountComponentAtNode(domContainerNode);
    ReactDOM.render(React.createFactory(component)(props), domContainerNode);
}

renderApp(window['store'].props);
