export type Theme = 'light' | 'dark';


export type ColorStateNames = 
    'text' | 'textSecondary' | 'text-secondary'
    | 'bg' | 'bgSecondary' | 'bg-secondary'
    | 'border'
    | 'primary'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
;


export type ColorShades = 
    5 | 10 
    | 15 | 20 
    | 25 | 30 
    | 35 | 40 
    | 45 | 50 
    | 55 | 60 
    | 65 | 70 
    | 75 | 80 
    | 85 | 90 
    | 95 | 100
;


export type ColorStates = `${ColorStateNames}${'' | `-${ColorShades}`}`;