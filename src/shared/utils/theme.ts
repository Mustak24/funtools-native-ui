function parseRgbChannels(color: string) {
    return color
        .trim()
        .replace('rgba', '')
        .replace('rgb', '')
        .replace('(', '')
        .replace(')', '')
        .split(',')
        .map(Number)
        .slice(0, 3);
}


export function toRgba(color: string, alpha: number = 100) {
    color = color.trim();

    if(color.startsWith('rgb')) {
        const [r, g, b] = parseRgbChannels(color);
        return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
    }
    
    if(color.startsWith('#')) return hexToRgba(color, alpha);
    
    throw new Error('Invalid color format');
}


export function rgbaToHex(rgba: string, alpha: number = 100) {
    const [r, g, b] = parseRgbChannels(rgba);
    return [
        '#',
        ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1),
        alpha < 100 ? Math.round((alpha / 100) * 255).toString(16).padStart(2, '0') : ''
    ].join('');
}


export function hexToRgba(hex: string, alpha: number = 100) {
    if(hex[0] !== '#') throw new Error('Invalid hex color');

    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
}


export function toHex(color: string, alpha: number = 100) {
    const rgba = toRgba(color, alpha);
    return rgbaToHex(rgba, alpha);
}


export function colorMix(color1: string, blend: number = 100, color2: string = 'rgba(255, 255, 255)') {
    const [r1, g1, b1] = parseRgbChannels(toRgba(color1));
    const [r2, g2, b2] = parseRgbChannels(toRgba(color2));

    const mix = (c1: number, c2: number) => c1 + (c2 - c1) * (blend / 100);

    return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
}
