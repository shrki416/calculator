export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

export function formatNumber(number) {
  return Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(number);
}
