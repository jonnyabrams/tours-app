import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TourType } from "../../typings/typings";
import TourCard from "../components/TourCard";

import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllTours } from "../redux/features/tourSlice";

const Home = () => {
  const { tours, loading } = useAppSelector((state) => state.tour);
  const dispatch = useAppDispatch();

  // trigger getAllTours in tourSlice which populates state.tours, extracted above
  useEffect(() => {
    dispatch(getAllTours());
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No tours found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours &&
                tours.map((item: TourType, index: number) => <TourCard />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
