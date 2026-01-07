import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BirthCerticat } from "../../data/typeData";

interface BirthActState {
  births: BirthCerticat[];
  loading: boolean;
  error: string | null;
}

const initialState: BirthActState = {
  births: [
  {
    id: '1',
    name: 'RAZAFY Miora',
    fatherName: 'RAZAFY Jean Pierre',
    motherName: 'RASOAMIARAMANANA Marie',
    fokontany: 'Ambohimanarina',
    dateOfBirth: '2024-03-15',
    registrationNumber: 'AC-2024-0315-001',
    requestDate: '2024-12-10',
    status: 'EN_ATTENTE',
    createdAt: '2024-12-10T08:30:00Z',
  },
  {
    id: '2',
    name: 'RAKOTO Tantely',
    fatherName: 'RAKOTO Paul',
    motherName: 'RAVELO Sophie',
    fokontany: 'Antsahavola',
    dateOfBirth: '2024-05-20',
    registrationNumber: 'AC-2024-0520-002',
    requestDate: '2024-12-12',
    status: 'APPROUVE',
    createdAt: '2024-12-12T10:15:00Z',
  },
  {
    id: '3',
    name: 'RANDRIA Feno',
    fatherName: 'RANDRIA Jacques',
    motherName: 'RABARY Nicole',
    fokontany: 'Mahamasina',
    dateOfBirth: '2024-08-05',
    registrationNumber: 'AC-2024-0805-003',
    requestDate: '2024-12-15',
    status: 'EN_ATTENTE',
    createdAt: '2024-12-15T14:20:00Z',
  },
],
  loading: false,
  error: null,
};
const birthActSlice = createSlice({
  name: "birthAct",
  initialState,
  reducers: {
    setBirths(state, action: PayloadAction<BirthCerticat[]>) {
      state.births = action.payload;
    },
    addBirth(state , action: PayloadAction<BirthCerticat>) {
      state.births.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setBirths, setLoading, setError,addBirth } = birthActSlice.actions;
export default birthActSlice.reducer;