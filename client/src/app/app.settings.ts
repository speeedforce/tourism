export class AppSettings {
    
    static get API_URL(): string {
        const path = `http://${window.location.hostname}/tourism-api/api`;
        return path;
    }


}