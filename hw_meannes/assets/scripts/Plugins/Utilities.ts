export default class Utilities {
    public static traverse(node: cc.Node, callback?: (n: cc.Node) => void) {
        node.children.forEach((c) => {
            callback(c);
            this.traverse(c, callback);
        });
    }

    public static isEquals(a: number, b: number, precision: number = Number.EPSILON): boolean {
        return Math.abs(a - b) < precision;
    }

    static randomItem<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    static isUndefinedOrNull(v: any) {
        return v === undefined || v === null;
    }

    static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomFloat(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }

    static getRandomVec2(min: cc.Vec2, max: cc.Vec2): cc.Vec2 {
        const vector = cc.v2(this.getRandomFloat(min.x, max.x), this.getRandomFloat(min.y, max.y));

        return vector;
    }

    static roundVec2(out: cc.Vec2, round: number = 0): void {
        const coef = Math.pow(10, round);
        out.x = Math.round(out.x * coef) / coef;
        out.y = Math.round(out.y * coef) / coef;
    }

    static clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    static toString(value: number): string {
        return `${value}`;
    }

    static getRandomElementFromArray<T>(array: T[]): T {
        const index: number = this.getRandomInt(0, array.length);
        return array[index];
    }

    static getType(obj: any): string {
        return obj ? obj.__proto__.constructor.name : obj;
    }

    static setParentSafely(node: cc.Node, parent: cc.Node): void {
        // @ts-ignore
        const m4_old = new cc.Mat4();
        // @ts-ignore
        const m4_p2 = new cc.Mat4();

        node.getWorldMatrix(m4_old);
        parent.getWorldMatrix(m4_p2);

        const oldScale = m4_old.getScale();
        const newScale = m4_p2.getScale().scale(node.getScale(cc.v2()));
        const newPosition = m4_old.getTranslation();

        node.position = parent.convertToNodeSpaceAR(newPosition);
        node.scaleX *= oldScale.x / newScale.x;
        node.scaleY *= oldScale.y / newScale.y;
        node.angle = this.getWorldAngle(node) - this.getWorldAngle(parent);

        node.setParent(parent);
    }

    static getWorldAngle(node: cc.Node): number {
        let worldAngle = node.angle;
        let parent = node.parent;

        while (parent) {
            worldAngle += parent.angle;
            parent = parent.parent;
        }

        return worldAngle;
    }

    static moveTowards(startPosition: cc.Vec2, endPosition: cc.Vec2, maxDistanceDelta: number): cc.Vec2 {
        const direction: cc.Vec2 = endPosition.sub(startPosition).normalize();

        let step: cc.Vec2 = direction.mul(maxDistanceDelta);

        if (startPosition.x < endPosition.x) {
            if ((startPosition.x + step.x) > endPosition.x) {
                step.x = endPosition.x - startPosition.x;
            }

            if ((startPosition.y + step.y) > endPosition.y) {
                step.y = endPosition.y - startPosition.y;
            }
        } else {
            if ((startPosition.x + step.x) < endPosition.x) {
                step.x = endPosition.x - startPosition.x;
            }

            if ((startPosition.y + step.y) < endPosition.y) {
                step.y = endPosition.y - startPosition.y;
            }
        }


        return startPosition.add(step);
    }

    static compareToFloatsWithPrecision(f1: number, f2: number, p: number = 100) {
        return ((Math.round(f1 * p) / p === Math.round(f2 * p) / p))
    }
}
