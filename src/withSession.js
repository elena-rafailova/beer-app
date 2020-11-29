import React from 'react';
import { Redirect } from 'react-router-dom';
import { SessionContext } from './SessionContext';

const withSession = WrappedComponent => props => {
    return (
            <SessionContext.Consumer>
                {contextState =>
                    contextState
                        ? <WrappedComponent {...props} context={contextState} />
                        : <Redirect to="/login"/>
                }
            </SessionContext.Consumer>
     );
};

export default withSession;