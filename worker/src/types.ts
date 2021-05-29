
export type UserResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  external_id: string;
  gravatar: string | null;
};

export type UserData = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  external_id: string;
  gravatar: string | undefined;
  last_sync_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type ExternalUser = {
  name: string;
  email: string;
  id: number | string;
  sync_id?: string | undefined;
};

export type ExternalUserResponse = {
  users: ExternalUser[];
  errors: string[];
}

export type SyncError = {
  external_id: string;
  message: string;
};

export type UserStoreResponse = {
  syncId: string;
  errors: SyncError[];
}
