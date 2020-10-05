import React from 'react'

const contactForm = props => {
    return (
        <div className="container">
        <hr />
        <div className="row">
            <div className="col-md-8 mx-auto">

                <h3 className="text-center pt-5">
                    Can't find something? Let us know below:
                </h3>
                <div className="form-group text-center pt-3">
                    <input type="email" className="form-control mb-2" placeholder="Enter Your Email" />
                    <textarea className="form-control textarea" rows="7" placeholder="Write Your Short description here"></textarea>
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" /> I Agree to recive further information as requested
                    </label>
                </div>
                <button type="submit" className="btn bg-color">Send</button>
            </div>
        </div>
        <hr />
    </div>
    )
}

export default contactForm
