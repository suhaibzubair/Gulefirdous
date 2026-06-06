// organizationSlice.ts
import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface OrganizationCreationState {
        loading: boolean;
        error: string | null;
        organization: any ;
      }
      


const initialState: OrganizationCreationState = {
    loading: false,
    error: null,
    organization:{} ,
  };
  export const createOrganization = createAsyncThunk (
    "createOrganization",
    async (payload: any, thunkApi) => {
      try {
        const response = await axios.post<any>(
          "http://localhost:4000/organization",
          payload
        );
        return response.data;
      } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  );
  export const getOrganization = createAsyncThunk (
    "getOrganization",
    async (_ ,thunkApi) => {
      try {
        const response = await axios.get<any>(
          "http://localhost:4000/organization"
        );
        return response.data;
      } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  );
const organizationSlice = createSlice({
  name: 'organizationCreation',
  initialState,
  reducers: {
    updateOrganizationData: (state, action: PayloadAction<any>) => {
      state.organization = { ...state.organization , ...action.payload };
    },

  },
  extraReducers(builder) {
    builder
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrganization.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(createOrganization.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganization.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(getOrganization.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateOrganizationData } = organizationSlice.actions;

export default organizationSlice.reducer;
