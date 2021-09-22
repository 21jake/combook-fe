export enum StudentType {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  MEDIUM = 'MEDIUM',
  AVERAGE = 'AVERAGE',
  BAD = 'BAD',
}

export const returnTypeBaseOnAverage = (avg: number) : StudentType => {
    
    if (avg <= 10 && avg >= 8.75) return StudentType.EXCELLENT;
    if (avg < 8.75 && avg >= 8) return StudentType.GOOD;
    if (avg < 8 && avg >= 6.5) return StudentType.MEDIUM;
    if (avg < 6.5 && avg >= 4.5) return StudentType.AVERAGE;
    if (avg < 4.5) return StudentType.BAD;
    return StudentType.BAD;
}

export const mapStudentType : {[key in StudentType] : string} = {
    [StudentType.EXCELLENT] : "Xuất sắc",
    [StudentType.GOOD] : "Giỏi",
    [StudentType.MEDIUM] : "Khá",
    [StudentType.AVERAGE] : "Trung bình",
    [StudentType.BAD] : "Yếu",
  }
  
  export const mapStudentBadge : {[key in StudentType] : string} = {
    [StudentType.EXCELLENT] : "success",
    [StudentType.GOOD] : "primary",
    [StudentType.MEDIUM] : "info",
    [StudentType.AVERAGE] : "warning",
    [StudentType.BAD] : "danger",
  }