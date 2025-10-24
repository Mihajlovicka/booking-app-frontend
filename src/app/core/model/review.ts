export interface Review{
  grade: number;
  id?: string;
  raterUsername?: string
  reviewFor: ReviewFor;
  entityInfo: string;
}

export enum ReviewFor
{
    HOST = "HOST",
    ACCOMMODATION = "ACCOMMODATION"
}
