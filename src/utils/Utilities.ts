export const randomColor = (): string => {
    return "#" + 
        (0x1000000 + Math.random() * 0xffffff)
        .toString()
        .substr(1, 6) + "80"
}