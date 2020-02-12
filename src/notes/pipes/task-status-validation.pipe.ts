// import { BadRequestException, PipeTransform } from '@nestjs/common';
//
// export class NoteStatusValidationPipe implements PipeTransform {
//   readonly allowedValue = Object.values(TaskStatus);
//   transform(value: any): any {
//     value = value.toUpperCase();
//
//     if (!this.isStatusValid(value)) {
//       throw new BadRequestException(`" ${value} "is not valid status`);
//     }
//
//     return value;
//   }
//   private isStatusValid(status: any): boolean {
//     const exists = this.allowedStatus.indexOf(status);
//     return exists !== -1;
//   }
// }
