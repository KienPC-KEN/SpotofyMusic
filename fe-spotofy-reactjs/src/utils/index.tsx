export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60); // Lấy phần nguyên của phút
  const remainingSeconds = Math.floor(seconds % 60); // Lấy phần dư là giây

  // Đảm bảo rằng các giá trị phút và giây đều có hai chữ số bằng cách thêm số 0 nếu cần
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};