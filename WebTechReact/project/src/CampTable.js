import React from "react";
import { MDBDataTable } from "mdbreact";
import { Campdata } from "./Campdata";
import Footer from "./Footer";
import Landing from "./Landing";

const DatatablePage2 = () => {
  return (
    <div className="h-[80vh] w-[98vw]">
      <Landing/>
      <MDBDataTable responsive striped bordered data={Campdata} />
      <Footer/>
    </div>
  );
};

export default DatatablePage2;
