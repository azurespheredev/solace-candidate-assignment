import { Advocate } from "./types";

export function mapAdvocatesWithKey(advocates: Advocate[]) {
  return advocates.map((advocate) => ({ key: advocate.id, ...advocate }));
}