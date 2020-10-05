import React, { Fragment } from 'react'
import Video1 from '../../Assets/videos/whatsapp.mp4'
import Video3 from '../../Assets/videos/CAR Parts- Names of Parts of a Car in English with Pictures - Auto Parts.mp4'

const Home = props => {

    return (
        <Fragment>
            <div className="container" >
                <div className="row" >
                    <div className="col-md-6 col-sm-12">
                        <video autoPlay loop controls muted
                            src={Video1} width="100%" height="100%"></video>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <video autoPlay loop controls muted
                            src={Video3} width="100%" height="100%">
                        </video>
                    </div>
                </div>
            </div>
            <hr width="100%" />
        </Fragment>
    )
}



export default Home
