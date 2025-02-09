export interface Person {
  _id: string;
  name: string;
  age: number;
  firstParent?: string;
  secondParent?: string;
}
