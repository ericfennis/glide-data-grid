import { CustomCell, parseToRgba } from "@glideapps/glide-data-grid";
import { CustomCellRenderer } from "../types";

interface SparklineCellProps {
    readonly kind: "sparkline-cell";
    readonly values: readonly number[];
    readonly yAxis: readonly [number, number];
    readonly color?: string;
}

export type SparklineCell = CustomCell<SparklineCellProps>;

const renderer: CustomCellRenderer<SparklineCell> = {
    isMatch: (cell: CustomCell): cell is SparklineCell => (cell.data as any).kind === "sparkline-cell",
    draw: (ctx, cell, theme, rect, hoverAmount) => {
        // eslint-disable-next-line prefer-const
        let { values, yAxis, color } = cell.data;
        const [minY, maxY] = yAxis;
        if (values.length === 0) return true;
        if (values.length === 1) values = [values[0], values[0]];

        values = values.map(x => Math.min(1, Math.max(0, (x - minY) / (maxY - minY))));
        const padX = theme.cellHorizontalPadding;
        const drawX = padX + rect.x;

        const y = rect.y + 3;
        const height = rect.height - 6;
        const width = rect.width - padX * 2;

        // draw zero
        if (minY <= 0 && maxY >= 0) {
            const delta = maxY - minY;
            const zeroY = height * (maxY / delta);

            ctx.beginPath();
            ctx.moveTo(drawX, y + zeroY);
            ctx.lineTo(drawX + width, y + zeroY);

            ctx.globalAlpha = 0.4;
            ctx.lineWidth = 1;
            ctx.strokeStyle = theme.textLight;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // draw line
        ctx.beginPath();

        const xStep = (rect.width - 16) / (values.length - 1);
        const points = values.map((val, ind) => {
            return {
                x: drawX + xStep * ind,
                y: y + height - val * height,
            };
        });
        ctx.moveTo(points[0].x, points[0].y);

        let i: number;
        for (i = 1; i < points.length - 2; i++) {
            const xControl = (points[i].x + points[i + 1].x) / 2;
            const yControl = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xControl, yControl);
        }
        ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);

        ctx.strokeStyle = color ?? theme.accentColor;
        ctx.lineWidth = 1 + hoverAmount * 0.5;
        ctx.stroke();

        const delta = maxY - minY;
        const zeroY = maxY <= 0 ? y : minY >= 0 ? y + height : y + height * (maxY / delta);

        ctx.lineTo(rect.x + rect.width - padX, zeroY);
        ctx.lineTo(rect.x + padX, zeroY);
        ctx.closePath();

        ctx.globalAlpha = 0.2 + 0.2 * hoverAmount;
        const grad = ctx.createLinearGradient(0, y, 0, y + height * 1.4);
        grad.addColorStop(0, color ?? theme.accentColor);

        const [r, g, b] = parseToRgba(color ?? theme.accentColor);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
    },
    provideEditor: () => undefined,
};

export default renderer;