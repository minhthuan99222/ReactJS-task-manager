import React, { Component } from 'react';

class Notfound extends Component {
    render() {
        return (
            <div className='container'>
                
                <div className="alert alert-warning">
                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                    <strong>404 Not Found !!!</strong>
                </div>
                
            </div>
        );
    }
}

export default Notfound;