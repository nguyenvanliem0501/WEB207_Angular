import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'demo_project';
  subTitle = 'Nguyen Van Liem';


//   student = {
//     name: 'Nguyen Van Liem',
//     age: 20,
//     phone: '0392202682',
//     email: 'nguyenvanliem0501@gmail.com',
//     img: 'https://znews-photo.zadn.vn/w660/Uploaded/mdf_eioxrd/2021_07_12/2.jpg'
//   };

  students = [
    {
        id: 1,
        name: 'Nguyen Van Liem ',
        age: 20,
        phone: '0392202682',
        email: 'nguyenvanliem0501@gmail.com',
        img: 'https://znews-photo.zadn.vn/w660/Uploaded/mdf_eioxrd/2021_07_12/2.jpg'
    },
    {
        id: 2,
        name: 'Than Hoang Anh',
        age: 20,
        phone: '0392202682',
        email: 'nguyenvanliem0501@gmail.com',
        img: 'https://znews-photo.zadn.vn/w660/Uploaded/mdf_eioxrd/2021_07_12/2.jpg'
    },
    {
        id: 3,
        name: 'Dam Tuan Khang',
        age: 20,
        phone: '0392202682',
        email: 'nguyenvanliem0501@gmail.com',
        img: 'https://znews-photo.zadn.vn/w660/Uploaded/mdf_eioxrd/2021_07_12/2.jpg'
    }
  ];

  remove(id :number) {
   this.filterStudents = this.filterStudents.filter(student => student.id !== id);
  }


//   user = [
//       {
//             id: 1,
//             ten: 'Nguyễn Văn Liêm',
//             weight: 20,
//             height: '172cm',
//             img: 'https://photo-cms-sggp.zadn.vn/w580/Uploaded/2022/dqmbbcvo/2021_10_07/cristianoronaldo_ccdk.jpg',

//       },
//       {
//             id: 2,
//             ten: 'Than Hoang Anh',
//             weight: 40,
//             height: '172cm',
//             img: 'https://photo-cms-sggp.zadn.vn/w580/Uploaded/2022/dqmbbcvo/2021_10_07/cristianoronaldo_ccdk.jpg',

//       },
//       {
//             id: 3,
//             ten: 'Nguyen Tuan Nam',
//             weight: 10,
//             height: '172cm',
//             img: 'https://photo-cms-sggp.zadn.vn/w580/Uploaded/2022/dqmbbcvo/2021_10_07/cristianoronaldo_ccdk.jpg',

//       },
//       {
//             id: 4,
//             ten: 'Dam Tuan Khang',
//             weight: 60,
//             height: '172cm',
//             img: 'https://photo-cms-sggp.zadn.vn/w580/Uploaded/2022/dqmbbcvo/2021_10_07/cristianoronaldo_ccdk.jpg',

//       },
      
//   ]

  // Remove bài cân nặng
//   remove(id :number) {
//       const users = this.user.filter(us => us.id == id)

//         if(users[0].weight > 30) {
//             this.user = this.user.filter(us => us.id !== id)
//         } else {
//             alert("không xóa cân nặng < 30  ")
//         }
      
//   }


  // Search
    searchValue = ' ';
    // spread , lấy tất cả phần tử của student đưa vào 1 mảng mới và gán cho filterStudents
    filterStudents = this.students;

    onSearch(event :any) {  
        this.searchValue = event.target.value;

        // nếu gán cho this.student thì khi xóa tìm kiếm sẽ mất dữ liệu mảng cũ  
        this.filterStudents = this.students.filter(student => {
            const studentNameLowerCase = student.name.toLocaleLowerCase();
            const searchValueLowerCase = this.searchValue.toLocaleLowerCase().trim();

            return studentNameLowerCase.indexOf(searchValueLowerCase) !== -1;

        });
    }


    // Form input
    newUser = {
        id: 0,
        name: '',
        age: 0,
        phone: '',
        email: '',
        img: ''
    };

    onChangeInput(event :any, key :string) {
        const inputValue = event.target.value;

        this.newUser = {
            ...this.newUser,
            [key]: inputValue   
        };

        console.log(this.newUser);
    }

    onSubmit() {
        // Validate truoc khi cap nhat du lieu
        if (!this.onValidate(this.newUser)) {
            // Neu k pass qua dieu kien validate, thi se return ra khoi ham submit luon
            return;
        }
    
        // Kiem tra xem this.newUser co id hay khong
        if (this.newUser.id) {
            // Neu co id thi se la cong viec chinh sua
            // Tim xem dau la phan tu co id la id dang duoc chinh sua
            for (let i = 0; i < this.students.length; i++) {
            // Kiem tra phan tu nao co id trung voi id cua du lieu chinh sua
            if (this.students[i].id === this.newUser.id) {
                // Khi tim thay thi gan gia tri cho phan tu do
                this.students[i] = this.newUser;
            }
            }
        } else {
            // Cong viec tao moi
            // Nhet thang newUser vao mang this.student
            this.newUser = {
            ...this.newUser,
            id: this.students.length + 1,
            age: Number(this.newUser.age)
            };
    
            this.students.push(this.newUser);
            // Van de gap phai: neu filterStudents = [...this.students]
            // thi se khong cap nhat moi duoc
    
        }
    
        // Cap nhat du lieu default cho newUser de hien thi ben view
        this.newUser = {
            id: 0,
            name: '',
            age: 0,
            phone: '',
            email: '',
            img: ''
        }

    }


    //Validate
    onValidate(obj :any) {
        if(!obj.name || !obj.age || !obj.phone || !obj.email || !obj.img) {
            return false;
        }

        return true;
    }

    // Chỉnh sửa
    onEdit(student :any) {
        this.newUser = student;
    }

}
