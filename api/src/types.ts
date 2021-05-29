import {
  Request,
  RequestHandler,
  Response
} from 'express';

type Method = | 'get' | 'post';

export type Controller = (req: Request, res: Response) => any;

export type Route = {
  method: Method;
  path: string;
  middleware: RequestHandler[];
  controller: Controller;
};

export type UserResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  external_id: string;
  gravatar: string | null;
};

export type UserData = {
  internal_id: string;
  first_name: string;
  last_name: string;
  email: string;
  external_id: string;
  gravatar: string | null;
  last_sync_id: string;
  created_at: number;
  updated_at: number;
};

export type SyncError = {
  external_id: string;
  message: string;
};

export type SyncStatus = {
  status: string;
  percentComplete: string;
  errors: SyncError[];
}
