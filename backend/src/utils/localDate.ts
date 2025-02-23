export function toLocalISOString(date: Date): string {
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    // getTimezoneOffset() devuelve la diferencia en minutos entre la hora local y UTC
    const timezoneOffsetInMinutes = date.getTimezoneOffset();
    // El signo es "-" si la zona horaria está detrás de UTC (por ejemplo, UTC-5)
    const offsetSign = timezoneOffsetInMinutes > 0 ? "-" : "+";
    const absOffset = Math.abs(timezoneOffsetInMinutes);
    const offsetHours = pad(Math.floor(absOffset / 60));
    const offsetMinutes = pad(absOffset % 60);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}
