export interface IAuthor {
  id: number;
  faName: string;
  enName: string;
  biography: string;
  image?: string | undefined;
}

export interface CreateAuthorBody {
  faName: string;
  enName: string;
  biography: string;
  image?: string | undefined;
}
