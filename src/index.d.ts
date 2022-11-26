declare module "five.db" {
    export class Database {
    constructor();
    private addSubtract;
    private setArray;
    public all(): {
        id: string;
        value: any;
    }[];
    public get(key: string): null;
    public set(key: string, value: any): boolean;
    public has(key: string): boolean;
    public delete(key: string): boolean;
    public deleteAll(): boolean;
    public add(key: string, value: number): number;
    public sub(key: string, value: number): number;
    public push(key: string, value: any | any[]): [];
    public pull(key: string, value: any | any[] | ((data: any) => boolean)): [];
  }
}