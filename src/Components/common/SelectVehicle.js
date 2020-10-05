import React, { useState, Fragment } from 'react'
import { years, Models, ModelsInfo } from './VehiclesInfo';

const SelectVehicle = props => {

    const [year, setYear] = useState(null);
    const [model, setModel] = useState(null);
    const [models, setModels] = useState(null);
    const [specificModel, setSpecificModel] = useState(null);
    const [selectModel, setSelectModel] = useState(null);




    const yearClicked = yr => {
        setYear(yr);
        console.log(yr);
        setModels(Models);
    }
    const ModelClicked = md => {
        setModel(md);
        const modelinfo = ModelsInfo.filter(mod => mod.id === md);
        console.log(md);
        setSpecificModel(modelinfo[0].options)
    }

    const specificModelClicked = sm => {
        setSelectModel(sm);
    }

    const submitform = () => {
        if (!year || !model || !selectModel) {
            alert("Please Select Vehicle correctly")
        } else {
            const e =  year + " " + model + " " + selectModel;
            props.selectedVehicle(e)
        }
    }

    return <div className="container">
        <button type="button" class="btn btn-block text-center btn-warning my-5" data-toggle="modal" data-target="#exampleModalLong">
            Select Vehicle
</button>

        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Select Vehicle</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="list-group">
                                        {
                                            years.map((yr, i) => {

                                                return (
                                                    <li key={i} className="list-group-item" onClick={() => yearClicked(yr)}>{yr}</li>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="list-group">
                                        {
                                            models !== null && models.map((md, i) => {

                                                return (
                                                    <li key={i} className="list-group-item" onClick={() => ModelClicked(md)}>{md}</li>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="list-group">
                                        {
                                            specificModel !== null && specificModel.map((sm, i) => {

                                                return (
                                                    <li key={i} className="list-group-item" onClick={() => specificModelClicked(sm)}>{sm}</li>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" disabled={!year || !model || !selectModel} onClick={submitform}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SelectVehicle