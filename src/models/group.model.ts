export class Group {
  groupId: string;
  groupName?: string;
  description?: string;
  users?: {
    readOnly?: string[],
    editors?: string[]
    admins?: string[],
  };
}