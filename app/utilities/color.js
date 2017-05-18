export const randomColor = () => color( random(0,255), random(0,255), random(0,255) );
export const lighten = (c, percentage) => color(
	red(c),
	green(c),
	blue(c),
	map(percentage, 0, 1, 0, 255)
);