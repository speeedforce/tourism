import { Observable } from 'rxjs';
import { IArticle } from 'src/app/types/core';
export function mockArticle() {
    return new Observable(sub => {
        sub.next({
            title: "Defaul artcile",
            content: 'Lorem Ipsum is simply dummy text of the printing and ' +
                'typesetting industry. Lorem Ipsum has been the industrys  ' +
                'standard dummy text ever since the 1500s, when an unknown printer  ' +
                'took a galley of type and scrambled it to make a type specimen book.  ' +
                'It has survived not only five centuries, but also the leap into  ' +
                'electronic typesetting, remaining essentially unchanged.  ' +
                'It was popularised in the 1960s with the release of  ' +
                'Letraset sheets containing Lorem Ipsum passages,  ' +
                'and more recently with desktop publishing software like  ' +
                'Aldus PageMaker including versions of Lorem Ipsum.',
            created: new Date().toDateString(),
            imageUrl: 'assets/pictures/spring.jpg',
            attachments: [ 'assets/pictures/spring.jpg', 'assets/pictures/winter.jpg', 'assets/pictures/summer.jpg'],
            docs: ['assets/pictures/spring.jpg', 'assets/pictures/spring.jpg', 'assets/pictures/spring.jpg'],
            id: 1
        })
        sub.complete();
        // author: "Stas Zinoviev",    
    })
}