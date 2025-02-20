import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import myAxios from '@/myAxios';
import { AxiosError } from 'axios';

interface User {
  email: string | null;
  name: string | null;
}

interface AuthState {
  isAuth: boolean;
  user: User;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  user: { email: null, name: null },
  isLoading: true
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { getState, rejectWithValue }) => {
  const state = getState() as { auth: AuthState };
  if (state.auth.user.email) return state.auth.user;
  try {
    const { data } = await myAxios.get('api/user');
    return data;
  } catch (error) {
    return rejectWithValue('Failed to fetch user');
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: { email?: string; name?: string }, { rejectWithValue }) => {
    try {
      const { data } = await myAxios.put('/api/user', userData);
      document.cookie = `token=${data.token}; path=/`;
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || 'Не удалось обновить данные');
      } else {
        return rejectWithValue('Не удалось обновить данные');
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = { email: null, name: null };
      state.isLoading = false;
      document.cookie = 'token=; Max-Age=0; path=/';
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isAuth = false;
        state.user = { email: null, name: null };
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  }
});

export const { login, logout, setAuth, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
