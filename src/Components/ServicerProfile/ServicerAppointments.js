import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  servicerAppoinments,
  deleteSpecificAppointment,
} from "../../actions/Services/appointment";
import Spinner from "../common/Spinner";
import { Table, Tbody, Thead, Tr, Td, Th } from "react-responsive-list";
import "react-responsive-list/assets/index.css";

const ServicerAppointments = ({
  appointment: { appointments, loading },
  servicerAppoinments,
  deleteSpecificAppointment,
}) => {
  useEffect(() => {
    servicerAppoinments();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container my-5">
      <h4 className="text-center text-orange">Appointments</h4>
      <Table breakPoint={768}>
        <Thead>
          <Tr>
            <Th>Customer Name</Th>
            <Th>Date</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {!appointments.length > 0 ? (
            <h6 className="text-center my-5">There is No Appointments</h6>
          ) : (
            appointments.map((app, index) => {
              const { _id, userId, date } = app; //destructuring

              return (
                <Tr key={index}>
                  <Td>
                    <h6>{userId.name}</h6>
                  </Td>
                  <Td>{date}</Td>
                  <Td>
                    <Link to={`/service-provider/appointment/${_id}`}>
                      Details
                    </Link>
                  </Td>
                  <Td>
                    <button
                      onClick={() => deleteSpecificAppointment(_id)}
                      className="btn bg-color px-3"
                    >
                      Complete
                    </button>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, {
  servicerAppoinments,
  deleteSpecificAppointment,
})(ServicerAppointments);
