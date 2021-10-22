
export function generateMenu(): ILink[] {
        return [
            { title: "Головна", link: "/"},
            { title: "Контакти", link: "/contact"}, 
            { title: "Карти", link: '/maps '}
        ];
    } 

export interface ILink  {
    title: string;
    link: string;
}
