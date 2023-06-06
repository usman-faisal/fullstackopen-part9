export interface Note {
    id: number;
    date: string;
    weather: string;
    visibility: string;
}

export interface NewNote extends Omit<Note,"id">{
    comment?: string;
}

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}
