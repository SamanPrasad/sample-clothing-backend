export type productGroupsRequest = {
  title: string;
  slug: string;
  image: string;
  groupType: "categories" | "collections";
  productIds: string[];
};
