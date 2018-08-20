export default function specialAssign(a:any, b:any, reserved:any) {
  for (var x in b) {
    if (!b.hasOwnProperty(x)) continue;
    if (a[x]) continue;
    if (reserved[x]) continue;
    a[x] = b[x];
  }
}