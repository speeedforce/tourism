
export function generateMenu(): ILink[] {
        return [
            { title: "Головна", link: "/"},
            { title: "Календар", link: "/calendar"},
            { title: "Карти", link: "/maps"},
            { title: "Контакти", link: "/contact"},
            { title: "Архів", link: "/archive"},   
            { title: "Вхід", link: "/login"},   
            { title: "Реєстрація", link: "/register"}  
        ];
    } 

    export function generateMenuRegister(username: string): ILink[] {
        return [
            { title: "Головна", link: "/"},
            { title: "Календар", link: "/calendar"},
            { title: "Карти", link: "/maps"},
            { title: "Контакти", link: "/contact"},
            { title: "Архів", link: "/archive"}, 
            { title: username, link: '/profile'},  
            { title: "Вихід", link: "/logout"}  
        ];
    } 

export interface ILink  {
    title: string;
    link: string;
}
