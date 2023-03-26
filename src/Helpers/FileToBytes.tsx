function readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      reader.readAsArrayBuffer(file);
    })
  }

const  fileToBytes = async (file: File) => {
    const arrayBuffer:number[] = await readFileAsync(file!) as number[];
    const array = new Uint8Array(arrayBuffer);
    return Array.from(array);
  }

  export default fileToBytes;