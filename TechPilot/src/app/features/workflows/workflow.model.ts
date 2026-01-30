// export interface Workflow{
//     id:number;
//     name:string;
//     priority:'Low' | 'Medium' | 'High';
//     status:'Draft'|'In Review'| 'Approved' |'Rejected';
//     assignedUsers:string[];
//     dueDate:Date
// }
export interface Workflow {
  id: number;
  name: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Draft' | 'In Review' | 'Approved' | 'Rejected';
  assignedUsers: string[];
  dueDate: Date;
  createdDate?: Date;  // <-- Add this optional property
}
