const useExportExcel = (data: ArrayBuffer, fileName: string) => {
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
};

export default useExportExcel;
