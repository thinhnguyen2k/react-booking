export const path = {
    HOME: '/',
    HOMEPAGE: '/home', 
    LOGIN: '/login', 
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DOCTOR:'/doctor',
    STAFF:'/staff',
    DETAIL_DOCTOR: '/detail-doctor/:id',
    CATEGORY:'/category',
    SPECIALTY:'/specialty/:idSpecilist',
    BOOKING:'/booking/:id/:idDoctor/:idTime/:date', 
    CATEGORY_SPECIALTY: '/category-specialty',
    PROFILE: '/profile/:idPatient',
    LISTDOCTOR:'/listdoctor'
};

export const languages = {
    VI: 'vi',
    EN: 'en'
};
 
export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}
export const USER_ROLE = {
    ADMIN: 1,
    DOCTOR: 3,
    STAFF: 2,
    PATIENT:'R4',

}