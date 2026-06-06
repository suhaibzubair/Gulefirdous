// schoolCreationSlice.ts
import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
 import { SchoolCreation ,SchoolinitialValue} from '../../features/schools/schoolCreationForm/SchoolCreationForm.d';
import axios from 'axios';
interface SchoolCreationState {
        loading: boolean;
        error: string | null;
        school: SchoolCreation ;
      }
      


const initialState: SchoolCreationState = {
    loading: false,
    error: null,
    school: SchoolinitialValue,
  };
  export const createSchool = createAsyncThunk (
    "createSchool",
    async (payload: SchoolCreation, thunkApi) => {
      try {
        const response = await axios .post<SchoolCreation>(
          "http://localhost:4000/schools",
          payload
        );
        console.log("response", response);
        return response.data;
      } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  );
const schoolCreationSlice = createSlice({
  name: 'schoolCreation',
  initialState,
  reducers: {
    updateSchoolData: (state, action: PayloadAction<any>) => {
    console.log(action.payload )
      state.school = { ...state.school , ...action.payload };
    },

  },
  extraReducers(builder) {
    builder
      .addCase(createSchool.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous login error if any
      })
      .addCase(createSchool.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.school = action.payload;
        // You may want to update the state based on successful login
      })
      .addCase(createSchool.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateSchoolData } = schoolCreationSlice.actions;

export default schoolCreationSlice.reducer;
