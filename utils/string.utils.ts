export namespace StringUtils {
  export const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : str);

  export const compressGrades = (grades: string[]): string[] => {
    const toNum = (g: string): number => (g === "k" ? 0 : Number(g.replace("grade_", "")));

    const toLabel = (n: number): string => (n === 0 ? "K" : String(n));

    const nums = Array.from(new Set(grades.map(toNum)))
      .filter((n) => Number.isInteger(n) && n >= 0 && n <= 12)
      .sort((a, b) => a - b);

    if (nums.length === 0) return [];

    const out: string[] = [];
    let start = nums[0];
    let prev = nums[0];

    for (let i = 1; i < nums.length; i++) {
      const cur = nums[i];
      if (cur === prev + 1) {
        prev = cur;
        continue;
      }

      out.push(start === prev ? toLabel(start) : `${toLabel(start)}-${toLabel(prev)}`);

      start = prev = cur;
    }

    out.push(start === prev ? toLabel(start) : `${toLabel(start)}-${toLabel(prev)}`);

    return out;
  };
}
