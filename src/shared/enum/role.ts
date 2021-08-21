export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export const roleArray : Role[] = [Role.STUDENT, Role.TEACHER];

export const mapRole : {[key in Role] : string} = {
  [Role.STUDENT] : "Học sinh",
  [Role.TEACHER] : "Giáo viên",
  [Role.ADMIN] : "Quản trị viên",
}

export const mapRoleBadge : {[key in Role] : string} = {
  [Role.STUDENT] : "info",
  [Role.TEACHER] : "success",
  [Role.ADMIN] : "warning",
}