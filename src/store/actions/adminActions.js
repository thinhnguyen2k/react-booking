import actionTypes from './actionTypes';
import {
    getAllSpecialist,
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctor,
    createNewPatient,
    createNewSpecialty,
    createNewExaminationHourUserService,
    createDoctorInfo,
    getAllExamination,createDoctorTime,createbooking,getAllDayDoctor,createhistory,
    getAllDay,
    getAllSlotTime,
    getInfoPayment

} from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => {
//     return async (dispatch,getState)=>{
//         try {
//             dispatch({type: actionTypes.FETCH_GENDER_START})
//             let res = await getAllCodeService("GENDER");
//             if(res && res.errCode === 0){
//                 dispatch(fetchGenderSuccess(res.data));

//             }else{
//                 dispatch(fetchGenderFailed());
//             }
//         } catch (e) {
//             dispatch(fetchGenderFailed());
//             console.log(e)
//         }
//     }
// }
// export const fetchGenderSuccess = (genderData) => ({
//     type: actionTypes.FETCH_GENDER_SUCCESS,
//     data: genderData
// })
// export const fetchGenderFailed = () => ({
//     type: actionTypes.FETCH_GENDER_FAILED
// })



export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService();
            if (res && res.success === true) {
                dispatch(fetchPositionSuccess(res.result));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log(e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})



// export const fetchRoleStart = () => {
//     return async (dispatch,getState)=>{
//         try {
//             let res = await getAllCodeService("ROLE");
//             if(res && res.errCode === 0){
//                 dispatch(fetchRoleSuccess(res.data));

//             }else{
//                 dispatch(fetchRoleFailed());
//             }
//         } catch (e) {
//             dispatch(fetchRoleFailed());
//             console.log(e)
//         }
//     }
// }
// export const fetchRoleSuccess = (roleData) => ({
//     type: actionTypes.FETCH_ROLE_SUCCESS,
//     data: roleData
// })
// export const fetchRoleFailed = () => ({
//     type: actionTypes.FETCH_ROLE_FAILED
// })


//staffff
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('check', res)
            if (res && res.success === true) {
                toast.success('Thêm mới người dùng thành công')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log(e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILD,
})
// dat lich
export const createNewBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createbooking(data);
            console.log('check', res)
            if (res && res.success === true && res.message ==='Booking success') {
                toast.success('Đặt lịch thành công');
                alert('Lịch khám đã được đạt hệ thống sẽ xử lí trong thời gian sớm nhất')
                dispatch(saveBookingSuccess());
                dispatch(fetchAllUserStart());
            } 
            if (res && res.success === true && res.message ==='Dont booking') {
                toast.warn('Không thể đặt cùng lúc 1 khung giờ với 2 bác sĩ, vui lòng chọn giờ khám khác!!!!!');
                // dispatch(saveBookingSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveBookingFailed());
            }
        } catch (e) {
            dispatch(saveBookingFailed());
            console.log(e)
        }
    }
}

export const saveBookingSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveBookingFailed = () => ({
    type: actionTypes.CREATE_USER_FAILD,
})




// them gio kham cho bac si
export const createNewDoctorTime = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createDoctorTime(data);
            console.log('check', res)
            if (res && res.success === true && res.message === 'Add time success 1' || res && res.success === true && res.message === 'Add time success') {
                toast.success('Tạo mới giờ khám bác sĩ thành công')
                dispatch(saveDoctorTimeSuccess());
                dispatch(fetchAllUserStart());
            }
            if (res && res.success === true && res.message === 'Time revered') {
                toast.warn('Đã tồn tại giờ khám bác sĩ')
                // dispatch(saveDoctorTimeSuccess());
                // dispatch(fetchAllUserStart());
            }
            
            else {
                dispatch(saveDoctorTimeFailed());
            }
        } catch (e) {
            dispatch(saveDoctorTimeFailed());
            console.log(e)
        }
    }
}

export const saveDoctorTimeSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveDoctorTimeFailed = () => ({
    type: actionTypes.CREATE_USER_FAILD,
})
//paitent
export const createNewUserPatient = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewPatient(data);
            console.log('check', res)
            if (res && res.success === true && res.message==='Create success' ) {
                toast.success('Đăng kí tài khoản mới thành công')
                dispatch(savePatientSuccess());
                dispatch(fetchAllUserStart());
            } 
            if (res && res.success === true && res.message==='Email already exist') {
                toast.warn('Tài khoản đã tồn tại')
            } else {
                dispatch(savePatientFailed());
            }
        } catch (e) {
            dispatch(savePatientFailed());
            console.log(e)
        }
    }
}

export const savePatientSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const savePatientFailed = () => ({
    type: actionTypes.CREATE_USER_FAILD,
})
// doctor info
export const createDoctorDetailInfo = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createDoctorInfo(data);
            console.log('check', res)
            if (res && res.success === true) {
                toast.success('Thêm thông tin bác sĩ thành công')
                dispatch(saveDoctorSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveDoctorFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log(e)
        }
    }
}

export const saveDoctorSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveDoctorFailed = () => ({
    type: actionTypes.CREATE_USER_FAILD,
})

//chuyen khoa
export const createSpeciatly = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewSpecialty(data);
            console.log('check', res)
            if (res && res.success === true) {
                toast.success('Tạo mới chuyên khoa thành công')
                dispatch(saveSpecialtySuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveSpecialtyFailed());
            }
        } catch (e) {
            dispatch(saveSpecialtyFailed());
            console.log(e)
        }
    }
}

export const saveSpecialtySuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveSpecialtyFailed = () => ({
    type: actionTypes.CREATE_USER_FAILD,
})

// lich su kham benh(duyet don kham benh)
export const createNewHistory = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createhistory(data);
            console.log('check', res)
            if (res && res.success === true) {
                toast.success('Duyệt đơn khám bệnh thành công')
                dispatch(saveHistorySuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveHistoryFail());
            }
        } catch (e) {
            dispatch(saveHistoryFail());
            console.log(e)
        }
    }
}

export const saveHistorySuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveHistoryFail = () => ({
    type: actionTypes.CREATE_USER_FAILD,
})

// Tao gio kham moi
export const createNewExaminationHour = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewExaminationHourUserService(data);
            console.log('check', res)
            if (res && res.success === true ) {
                toast.success('Thêm giờ thành công giờ khám mới')
                dispatch(saveHourSuccess());
            } else {
                dispatch(saveHourFailed());
            }
        } catch (e) {
            dispatch(saveHourFailed());
            console.log(e)
        }
    }
}

export const saveHourSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveHourFailed = () => ({
    type: actionTypes.CREATE_USER_FAILD,
})
//lay danh sach gio kham
export const fetchAllExamination = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllExamination();
            if (res && res.success === true) {
                console.log(res)
                dispatch({
                    type: actionTypes.FETCH_ALL_EXAMINATION_SUCCESS,
                    dataAllExamination: res.result,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_EXAMINATION_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_EXAMINATION_FAILED,
            });
            console.log(e)
        }
    }
}
// lay danh sach ngay kkhám
export const fetchAllDay = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDay();
            if (res && res.success === true) {
                console.log(res)
                dispatch({
                    type: actionTypes.FETCH_ALL_DAY_SUCCESS,
                    dataAllDay: res.result,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DAY_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DAY_FAILED,
            });
            console.log(e)
        }
    }
}

// lay danhsach gio kahm
export const fetchAllSlotTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSlotTime();
            if (res && res.success === true) {
                console.log(res)
                dispatch({
                    type: actionTypes.FETCH_ALL_SLOTTIME_SUCCESS,
                    dataAllSlotTime: res.result,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SLOTTIME_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_SLOTTIME_FAILED,
            });
            console.log(e)
        }
    }
}
// lay toan bo phuong thuc thanh toan
export const fetchAllPayment = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getInfoPayment();
            if (res && res.success === true) {
                console.log(res)
                dispatch({
                    type: actionTypes.FETCH_ALL_PAYMENT_SUCCESS,
                    dataAllPayment: res.result,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PAYMENT_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_PAYMENT_FAILED,
            });
            console.log(e)
        }
    }
}

// lay toan bo ngay kham cuar mot bac si
export const fetchAllDayDoctor = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDayDoctor(id);
            if (res && res.success === true) {
                console.log(res)
                dispatch({
                    type: actionTypes.FETCH_ALL_DAY_DOCTOR_SUCCESS,
                    dataAllDayDoctor: res.result,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DAY_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DAY_DOCTOR_FAILED,
            });
            console.log(e)
        }
    }
}

//lay danh sach chuyen khoa
export const fetchAllSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialist();
            if (res && res.success === true) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
                    dataAllSpecialty: res.result
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            });
            console.log(e)
        }
    }
}
export const fetchAllSpecialtySuccess = (data) => ({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data
})
export const fetchAlSpecialtyFailed = () => ({
    type: 'FETCH_ALL_USER_FAILED',
})
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log(e)
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data
})
export const fetchAllUserFailed = () => ({
    type: 'FETCH_ALL_USER_FAILED',
})
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            console.log('check', res)
            if (res && res.errCode === 0) {
                toast.success('Delete user success')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Delete user error')
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log(e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: 'DELETE_USER_SUCCESS',
})
export const deleteUserFailed = () => ({
    type: 'DELETE_USER_FAILD',
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            console.log('check', res)
            if (res && res.errCode === 0) {
                toast.success('Update user success')
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Update user error')
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log(e)
        }
    }
}

export const editUserSuccess = () => ({
    type: 'EDIT_USER_SUCCESS',
})
export const editUserFailed = () => ({
    type: 'EDIT_USER_FAILD',
})
// lay toan bo bac si
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.success === true) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctors: res.result
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}

export const saveDetailInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success('user info detail doctor success')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('user info detail doctor fail')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log(e);
            toast.error('user info detail doctor fail')
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllScheduleHours = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED,
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED,
            })
        }
    }
}