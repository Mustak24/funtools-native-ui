import { Color } from "@theme";

export function colorMix(color1: Color, bleand: number = 100, color2: Color = '255, 255, 255') {
    const [r1, g1, b1] = color1.split(',').map(Number);
    const [r2, g2, b2] = color2.split(',').map(Number);
    
    const mix = (c1: number, c2: number) => c1 + (c2 - c1) * (bleand / 100);

    return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
}


export function toRgba(color: Color, alpha: number = 100) {
    const [r, g, b] = color.split(',').map(Number);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
}