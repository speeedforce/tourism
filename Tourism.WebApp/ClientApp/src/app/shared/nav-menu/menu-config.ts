
export function generateMenu(): ILink[] {
        return [
            { title: "Головна", link: "/"},
            { title: "Календар", link: "/calendar"},
            { title: "Карти", link: "/maps"},
            { title: "Контакти", link: "/contact"},
            { title: "Архів", link: "/archive"},     
        ];
    } 


export interface ILink  {
    title: string;
    link: string;
}
