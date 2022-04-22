export const adminMenu = [
    { //quan li nguoi dung
        name: 'Người dùng',
        menus: [
            {
                name: 'Danh sách người dùng', link: '/system/user-manage'
            }, 
            {
                name: 'Thêm mới người dùng', link: '/system/user-redux' 
            },
            {
               name: 'Thêm thông tin bác sĩ', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },
                // ]
            },
        ]
    },
    {
        //quan li ke hoach kham benh cua bac si
        name:'Lịch khám bệnh bác sĩ',
        menus: [
            {
                name: 'Các ca khám bệnh', link: '/staff/manage-staff-booking'
            },
            {
                name: 'Thêm ca khám bệnh', link: '/system/manage-workshift'
            }
          
        ]
        
    },
    { //quan li Chuyen khoa
        name: 'Chuyên Khoa',
        menus: [
            {
                name: 'Quản lý chuyên khoa', link: '/system/manage-specialty'
            },
          
        ]
    },
    { //quan li Chuyen khoa
        name: 'Giờ Khám bệnh',
        menus: [
            {
                name: 'Quản lý giờ khám bệnh', link: '/system/manage-time'
            },
          
        ]
    },
    { //quan li Chuyen khoa
        name: 'Hồ sơ bệnh án',
        menus: [
            {
                name: 'Quản lý hồ sơ', link: '/system/manage-history'
            },
          
        ]
    },
]; 
export const DoctorMenu = [
    { //quan li nguoi dung
        name: 'Thông tin công tác',
        menus: [
            {
                //quan li ke hoach kahm benh
                name: 'Lịch khám bệnh',
                link:'/doctor/manage-schedule'
            }
        ]
    },
];
export const StaffMenu = [
    { //quan li Nhan vien
        name: 'Thông tin công tác',
        menus: [
            {
                //quan li ke hoach kahm benh
                name: 'Lịch khám bệnh',
                link:'/staff/manage-staff-booking'
            }
        ]
    },
];