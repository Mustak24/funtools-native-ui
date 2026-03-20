export type Theme = 'light' | 'dark';


export type ColorState = 
    'text' |  'text-secondary'
    | 'bg' | 'bg-secondary'
    | 'border'
    | 'primary'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
;

export type Color = `${number}, ${number}, ${number}`;