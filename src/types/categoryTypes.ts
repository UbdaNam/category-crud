export interface categoryType {
  id: number;
  title: string;
  parentId: number | null;
}

export type CategoryPositionType = {
  x: number;
  y: number;
};
