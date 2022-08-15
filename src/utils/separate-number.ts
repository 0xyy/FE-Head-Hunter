export const separateNumber = (number: number) => (
    Math.floor(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
);