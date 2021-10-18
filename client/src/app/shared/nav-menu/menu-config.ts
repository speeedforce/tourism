
export function generateMenu(): ILink[] {
        return [
            { title: "Головна", link: "/"},
            { title: "Контакти", link: "/contact"}, 
        ];
    } 

export interface ILink  {
    title: string;
    link: string;
}
