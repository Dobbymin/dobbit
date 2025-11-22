export const formattedDate = (dateString: string): string => {
  const date = dateString ? new Date(dateString) : null;

  const year = date ? date.getFullYear() : "";
  const month = date ? String(date.getMonth() + 1).padStart(2, "0") : "";
  const day = date ? String(date.getDate()).padStart(2, "0") : "";

  const Hour = date ? String(date.getHours()).padStart(2, "0") : "";
  const Minutes = date ? String(date.getMinutes()).padStart(2, "0") : "";
  const Seconds = date ? String(date.getSeconds()).padStart(2, "0") : "";

  return `${year}년 ${month}월 ${day}일 ${Hour}:${Minutes}:${Seconds}`;
};
