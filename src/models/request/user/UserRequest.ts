class UserRequest {
  static CreateUpdateUserRequest = {
      adminChecker: null,
      adminEmail: null,
      adminFirstName: null,
      adminLastName: null,
      adminMaker: null,
      adminPhoneNumber: null,
      adminRoleId: 0
    }

    static DeleteUserRequest = {
      userId: 0
    }

  }

  export default UserRequest