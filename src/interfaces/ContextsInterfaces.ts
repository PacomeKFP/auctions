export interface UserContextInterface {
  // adresse mail de l'utilisateur courant
  currentUser: string;
  changeCurentUser: (user: string) => void;

  currentUserId?: Array<string>;
  changeCurentUserId: (userId: Array<string>) => void;
}
export type UserTypeForContextInterface = string | null;

export interface FilterContextInterface {
  currentTags: Array<FilterTag>;
  toggleTag: (tag: FilterTag) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}
export type FilterTag = "PENDING" | "IN_PROGRESS" | "COMPLETED";
