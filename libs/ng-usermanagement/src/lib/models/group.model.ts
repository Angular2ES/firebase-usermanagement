export class Group {
  groupId: string;
  groupName?: string;
  description?: string;
  users?: {};
}

export const GroupUsersPermissions: Group['users'] = {
  readOnly: [],
  admins: [],
  editors: [],
}