// aboutYourLmsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Update FormData definition to match the one in LmsSetup.tsx
export interface FormData {
  IdentifyYourSelf: string;
  WorkInYourBusiness: string;
  BusinessIn: string;
  LearingBusiness: string;
  EmailList: string;
}

interface AboutYourLmsState {
  data: FormData;
}

const initialState: AboutYourLmsState = {
  data: {
    IdentifyYourSelf: '',
    WorkInYourBusiness: '',
    BusinessIn: '',
    LearingBusiness: '',
    EmailList: '',
  },
};

const aboutYourLmsSlice = createSlice({
  name: 'aboutYourLms',
  initialState,
  reducers: {
    updateAboutYourLmsData: (
      state,
      action: PayloadAction<FormData>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { updateAboutYourLmsData } = aboutYourLmsSlice.actions;

export const selectAboutYourLmsData = (state: RootState) =>
  state.aboutYourLms.data;

export default aboutYourLmsSlice.reducer;
