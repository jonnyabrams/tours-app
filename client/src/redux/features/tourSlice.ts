import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

import {
  ICreateTourData,
  IToursState,
  TourType,
} from "../../../typings/typings";

import * as api from "../api";

const initialState: IToursState = {
  tour: null,
  tours: [],
  userTours: [],
  error: "",
  loading: false,
};

export const createTour = createAsyncThunk(
  "tour/createTour",
  async (createdTourData: ICreateTourData) => {
    const response = await api.createTour(createdTourData);
    return response.data;
  }
);

export const getAllTours = createAsyncThunk("tour/getAllTours", async () => {
  const response = await api.getAllTours();
  return response.data;
});

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id: ObjectId) => {
    const response = await api.getTour(id);
    return response.data;
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async (id: ObjectId) => {
    const response = await api.deleteTour(id);
    return response.data;
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (id: ObjectId) => {
    const response = await api.getToursByUser(id);
    return response.data;
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(createTour.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createTour.fulfilled,
      (state, action: PayloadAction<ICreateTourData>) => {
        state.loading = false;
        state.tours = [action.payload];
      }
    );
    builder.addCase(createTour.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(getAllTours.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllTours.fulfilled,
      (state, action: PayloadAction<TourType[]>) => {
        state.loading = false;
        state.tours = action.payload;
      }
    );
    builder.addCase(getAllTours.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(getTour.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTour.fulfilled, (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    });
    builder.addCase(getTour.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(getToursByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getToursByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    });
    builder.addCase(getToursByUser.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(deleteTour.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTour.fulfilled, (state, action) => {
      state.loading = false;
      console.log("action", action);
      const { arg } = action.meta;
      if (arg) {
        state.userTours = state.userTours.filter(
          (item: TourType) => item._id !== arg
        );
        state.tours = state.tours.filter((item: TourType) => item._id !== arg);
      }
    });
    builder.addCase(deleteTour.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
  },
});

export default tourSlice.reducer;
