export interface ISnippet {
    id?: string;
    name: string;
    prefix: string;
    description: string;
    body: string;
    userId?: number;
}