export interface ConfirmParticipationInterface {
  auctionCode: string;
  userId: string;
  response: boolean;
  name?: string;
}

export interface CreateAuctionInterface {
  name: string;
  description: string;
  currency: string;
  anonymous: boolean;
  participantsCount: number;
  invitationsClosureDate: Date;
}