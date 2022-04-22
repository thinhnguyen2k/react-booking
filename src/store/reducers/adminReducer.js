import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allSpecialty: [],
    allExamination: [],
    allScheduleTime: [],
    allDayDoctors: [],
    allDay: [],
    allSlotTime: [],
    allPayment: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            console.log('start', action)
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:

            state.genders = action.data;
            state.isLoadingGender = false
            console.log('sueccess', action)

            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            state.genders = [];
            console.log('fail', action)

            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataAllDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.dataAllDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.allSpecialty = action.dataAllSpecialty;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            state.dataAllSpecialty = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_EXAMINATION_SUCCESS:
            state.allExamination = action.dataAllExamination;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_EXAMINATION_FAILED:
            state.dataAllExamination = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DAY_DOCTOR_SUCCESS:
            state.allDayDoctors = action.dataAllDayDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DAY_DOCTOR_FAILED:
            state.dataAllDayDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DAY_SUCCESS:
            state.allDay = action.dataAllDay;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DAY_FAILED:
            state.dataAllDay = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SLOTTIME_SUCCESS:
            state.allSlotTime = action.dataAllSlotTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SLOTTIME_FAILED:
            state.dataAllSlotTime = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_PAYMENT_SUCCESS:
            state.allPayment = action.dataAllPayment;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_PAYMENT_FAILED:
            state.dataAllPayment = [];
            return {
                ...state,
            }
        // case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
        //     state.allScheduleTime = action.dataTime;
        //     return {
        //         ...state,
        //     }
        // case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED:
        //     state.allScheduleTime = [];
        //     return {
        //         ...state,
        //     }
        default:
            return state;
    }
}

export default adminReducer;