import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import tech from './tech.jpg';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  // const url = 'background.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='container' style={{ backgroundImage: `url(${tech})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 

      <div className='wrapper' >
      
        <h1>Share your file at ease</h1>
        <p>Upload and share the download link.</p>
        
        <button className = "uploadbtn" onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target='_blank' rel="noopener noreferrer">{result}</a> 
        

      </div>

      <footer style={{ textAlign: 'center', fontSize:17, position: 'absolute', bottom: 0, width: '100%', marginTop: '20px',marginBottom: '20px', color: 'aliceblue' }}>
        Made by Nitin Nitnav
      </footer>
    </div>
  );
}

export default App;
