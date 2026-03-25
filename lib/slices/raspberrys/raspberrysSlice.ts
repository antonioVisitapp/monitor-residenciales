import { Raspberry } from "@/types/raspberry/raspberryTypes"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitialState {

    raspberrys: Raspberry[],


}


const initialState = {

    raspberrys: []
}

const raspberrySlice = createSlice({
    name: "raspberrySlice",
    initialState,
    reducers: {
        getAllRaspberrys: (action, payload: PayloadAction) => {
            
        }


    }

})


export default raspberrySlice.reducer;