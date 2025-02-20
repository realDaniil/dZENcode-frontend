import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  delay: number;
  isMultiavatar: boolean;
}

const loadSettingsFromStorage = (): SettingsState => {
  if (typeof window !== 'undefined') {
    const savedDelay = localStorage.getItem('delay');
    const savedIsMultiavatar = localStorage.getItem('isMultiavatar');
    return {
      delay: savedDelay ? Number(savedDelay) : 0,
      isMultiavatar: savedIsMultiavatar === 'true'
    };
  }
  return {
    delay: 0,
    isMultiavatar: false
  };
};

const initialState: SettingsState = loadSettingsFromStorage();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDelay: (state, action: PayloadAction<number>) => {
      state.delay = action.payload;
      localStorage.setItem('delay', action.payload.toString());
    },
    setIsMultiavatar: (state, action: PayloadAction<boolean>) => {
      state.isMultiavatar = action.payload;
      localStorage.setItem('isMultiavatar', action.payload.toString());
    }
  }
});

export const { setDelay, setIsMultiavatar } = settingsSlice.actions;
export default settingsSlice.reducer;
